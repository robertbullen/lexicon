import * as fs        from 'fs';
import * as generator from 'intent-utterance-generator';

import * as handlers   from './src/handlers';
import * as variations from './src/variations';

const about: string = '(about|on|pertaining to|regarding|under)';
const by: string = '(by|coined by|from|told by)';
const george: string = `(${variations.georgeVariations.join('|')})`;
const georges: string = `(${variations.georgeVariations.map((grandpa: string) => `${grandpa}'s`).join('|')})`;
const say: string = '(say|tell)';
const saying: string = `(${variations.sayingVariations.join('|')})`;
const sayings: string = `(${variations.sayingsVariations.join('|')})`;
const would: string = '(might|used to|would)';

type CustomIntents = Record<keyof handlers.CustomHandlers, string[]>;

const intents: CustomIntents = {
    GetAllPhrasesByTopicIntent: [
        `all ${sayings} ${about} {topic}`,
        `all of ${georges} ${sayings} ${about} {topic}`,
        `all ${sayings} ${by} ${george} ${about} {topic}`,
        `all ${sayings} of ${georges} ${about} {topic}`,
        `all ${sayings} that ${george} ${would} ${say} ${about} {topic}`,

        `(list|read|repeat|say) ( |for me|to me) all ${sayings} ${about} {topic}`,
        `(list|read|repeat|say) ( |for me|to me) all of ${georges} ${sayings} ${about} {topic}`,

        `(find|get) ( |for me|me) all ${sayings} ${about} {topic}`,
        `(find|get) ( |for me|me) all of ${georges} ${sayings} ${about} {topic}`,

        `tell ( |to me|me) all ${sayings} ${about} {topic}`,
        `tell ( |to me|me) all of ${georges} ${sayings} ${about} {topic}`,

        `search for all ${sayings} ${about} {topic}`,
        `search for all of ${georges} ${sayings} ${about} {topic}`
    ],
    GetOnePhraseAtRandomIntent: [
        `( |a) random ${saying}`,
        `( |a) random ${george} ${saying}`,
        `( |a) random ${saying} ${by} ${george}`,
        `( |a) random ${saying} of ${georges}`,
        `( |a) random ${saying} that ${george} ${would} ${say}`,

        `(list|read|repeat|say) ( |for me|to me) a random ${saying}`,
        `(list|read|repeat|say) ( |for me|to me) a random ${george} ${saying}`,
        `(list|read|repeat|say) ( |for me|to me) a random ${saying} (by|from) ${george}`,
        `(list|read|repeat|say) ( |for me|to me) a random ${saying} of ${georges}`,

        `(find|get) ( |for me|me) a random ${saying}`,
        `tell ( |to me|me) a random ${saying}`,
        `search for a random ${saying}`
    ],
    GetOnePhraseByTopicIntent: [],
    GetTopicsListIntent: []
};

fs.writeFileSync('utterances.txt', generator(intents).toString());
