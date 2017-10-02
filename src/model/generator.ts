// import * as assert    from 'assert';
import * as fs           from 'fs';
import * as expand       from 'intent-utterance-expander';
import * as shuffleArray from 'shuffle-array';

import * as intents    from '../common/intents';
import * as topics     from '../common/topics';
import * as variations from '../common/variations';

import * as schema from './schema';

// tslint:disable:typedef-whitespace
const about:   string = '(about|on|pertaining to|regarding|under|within)';
const george:  string = `(${variations.george.options.join('|')})`;
const georges: string = `(${variations.george.options.map((grandpa: string) => `${grandpa}'s`).join('|')})`;
const saidBy:  string = '(by|coined by|from|said by|told by)';
const say:     string = '(say|tell)';
const saying:  string = `(${variations.saying.options.join('|')})`;
const sayings: string = `(${variations.sayings.options.join('|')})`;
const topic:   string = `(|topic) {topic}`;
const would:   string = '(might|used to|would)';
// tslint:enable:typedef-whitespace

function combineAndExpand(beginnings: string[], endings: string[]): string[] {
    const templates: string[] = [];
    for (const beginning of beginnings) {
        for (const ending of endings) {
            templates.push(`${beginning} ${ending}`.trim());
        }
    }
    let utterances: string[] = [];
    for (const template of templates) {
        utterances = utterances.concat(expand(template));
    }

    // Too many utterances can be a hinderance. Take a reasonably sized, randomly selected sample.
    return shuffleArray(utterances).slice(0, 256);
}

type SchemaIntents = intents.RequiredIntents & intents.CustomIntents;
type SchemaIntentDefinitions = { [P in keyof SchemaIntents]: schema.UnnamedIntentDefinition };

const intentDefinitions: SchemaIntentDefinitions = {
    'AMAZON.CancelIntent': {
        samples: []
    },

    'AMAZON.HelpIntent': {
        samples: []
    },

    'AMAZON.StopIntent': {
        samples: []
    },

    GetAllPhrasesByTopicIntent: {
        samples: (() => {
            const beginnings: string[] = [
                '',
                '(repeat|say|search for)',
                '(find|get|list|read|tell) ( |me)',
            ];
            const endings: string[] = [
                `all ${sayings} ${about} ${topic}`,
                `all ${sayings} ${saidBy} ${george} ${about} ${topic}`,
                `all of ${georges} ${sayings} ${about} ${topic}`,
                `all ${sayings} of ${georges} ${about} ${topic}`,
                `all ${sayings} that ${george} ${would} ${say} ${about} ${topic}`
            ];
            return combineAndExpand(beginnings, endings);
        })(),
        slots: [
            {
                name: 'topic',
                type: 'Topic',
                samples: []
            }
        ]
    },

    GetOnePhraseAtRandomIntent: {
        samples: (() => {
            const beginnings: string[] = [
                '',
                '(repeat|say|search for)',
                '(find|get|list|read|tell) ( |me)',
            ];
            const endings: string[] = [
                `(a|any|one) random ${saying} ${about} ${topic}`,
                `(a|any|one) random ${saying} ${saidBy} ${george} ${about} ${topic}`,
                `(a|any|one) random ${george} ${saying} ${about} ${topic}`,
                `(a|any|one) random ${saying} of ${georges} ${about} ${topic}`,
                `(a|any|one) random ${saying} that ${george} ${would} ${say} ${about} ${topic}`
            ];
            return combineAndExpand(beginnings, endings);
        })(),
        slots: [
            {
                name: 'topic',
                type: 'Topic',
                samples: []
            }
        ]
    },

    GetOnePhraseByTopicIntent: {
        samples: [
            'about {topic}',
            'for a phrase on {topic}',
            'tell me a saying regarding {topic}',
            'get a phrase on the subject of {topic}'
        ],
        slots: [
            {
                name: 'topic',
                type: 'Topic',
                samples: []
            }
        ]
    },

    GetTopicsListIntent: {
        samples: [
            'list topics',
            'all topics',
            'list categories',
            'for categories',
            'all categories',
            'for topics'
        ],
        slots: []
    }
};

const skillDefinition: schema.SkillDefinition = {
    intents: Object.keys(intentDefinitions).map((name: string) => {
        const intentDefinition: schema.UnnamedIntentDefinition = intentDefinitions[name];
        // TODO: assert that declared slots are defined.
        return {
            name,
            ...intentDefinition
        };
    }),
    types: [
        {
            name: topics.Topic.typeName,
            values: topics.Topic.all.map((t: topics.Topic) => (
                {
                    id: t.id,
                    name: {
                        value: topics.TopicId.getName(t.id),
                        synonyms: t.synonyms
                    }
                }
            ))
        }
    ]
};

const filePath: string = process.argv[2];
fs.writeFileSync(filePath, JSON.stringify(skillDefinition, null, 2));
