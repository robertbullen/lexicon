import * as fs        from 'fs';
import * as generator from 'intent-utterance-generator';

import * as handlers   from './src/handlers';
import * as variations from './src/variations';

const about:   string = '(about|on|pertaining to|regarding|under|within)';
const george:  string = `(${variations.georgeVariations.join('|')})`;
const georges: string = `(${variations.georgeVariations.map((grandpa: string) => `${grandpa}'s`).join('|')})`;
const saidBy:  string = '(by|coined by|from|said by|told by)';
const say:     string = '(say|tell)';
const saying:  string = `(${variations.sayingVariations.join('|')})`;
const sayings: string = `(${variations.sayingsVariations.join('|')})`;
const would:   string = '(might|used to|would)';

type CustomIntents = Record<keyof handlers.CustomHandlers, string[]>;

function combine(beginnings: string[], endings: string[]): string[] {
    const utterances: string[] = [];
    for (const beginning of beginnings) {
        for (const ending of endings) {
            utterances.push(`${beginning} ${ending}`.trim());
        }
    }
    return utterances;
}

const intents: CustomIntents = {
    GetAllPhrasesByTopicIntent:(() => {
        const beginnings: string[] = [
            '',
            '(list|read|repeat|say) ( |for me|to me)',
            '(find|get) ( |for me|me)',
            'tell ( |to me|me)',
            'search for',
        ];
        const endings: string[] = [
            `all ${sayings} ${about} {topic}`,
            
            `all ${sayings} ${about} {topic} ${saidBy} ${george}`,
            `all ${sayings} ${saidBy} ${george} ${about} {topic}`,
    
            `all of ${georges} ${sayings} ${about} {topic}`,
            `all ${sayings} of ${georges} ${about} {topic}`,
    
            `all ${sayings} that ${george} ${would} ${say} ${about} {topic}`,
            `all ${sayings} ${about} {topic} that ${would} be ${saidBy} ${george}`,
        ];
        return combine(beginnings, endings);
    })(),

    GetOnePhraseAtRandomIntent: (() => {
        const beginnings: string[] = [
            `( |a) random ${saying}`,
            `( |a) random ${george} ${saying}`,
            `( |a) random ${saying} ${saidBy} ${george}`,
            `( |a) random ${saying} of ${georges}`,
            `( |a) random ${saying} that ${george} ${would} ${say}`,

            `(list|read|repeat|say) ( |for me|to me) a random ${saying}`,
            `(list|read|repeat|say) ( |for me|to me) a random ${george} ${saying}`,
            `(list|read|repeat|say) ( |for me|to me) a random ${saying} (by|from) ${george}`,
            `(list|read|repeat|say) ( |for me|to me) a random ${saying} of ${georges}`,

            `(find|get) ( |for me|me) a random ${saying}`,
            `tell ( |to me|me) a random ${saying}`,
            `search for a random ${saying}`
        ];
        const endings: string[] = [
            `(a|one) random ${saying} ${about} {topic}`,
            
            `(a|one) random ${saying} ${about} {topic} ${saidBy} ${george}`,
            `(a|one) random ${saying} ${saidBy} ${george} ${about} {topic}`,
    
            `(a|one) random ${george} ${saying} ${about} {topic}`,
            `(a|one) random ${saying} of ${georges} ${about} {topic}`,
    
            `(a|one) random ${saying} that ${george} ${would} ${say} ${about} {topic}`,
            `(a|one) random ${saying} ${about} {topic} that ${would} be ${saidBy} ${george}`,
        ];
        return combine(beginnings, endings);
    })(),
    
    GetOnePhraseByTopicIntent: [],
    GetTopicsListIntent: []
};

fs.writeFileSync('utterances.txt', generator(intents).toString());
