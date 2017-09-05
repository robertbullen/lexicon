import * as generator from 'intent-utterance-generator';

import * as handlers   from './src/handlers';
import * as variations from './src/variations';

const aboutAlternatives: string = '(about|on|regarding|under)';
const sayingAlternatives: string = `(${variations.sayingVariations.join('|')})`;
const sayingsAlternatives: string = `(${variations.sayingsVariations.join('|')})`;

type CustomIntents = { [P in keyof handlers.CustomHandlers]: string[] };

const intents: CustomIntents = {
    GetAllPhrasesByTopicIntent: [
        `all ${sayingsAlternatives} ${aboutAlternatives} {topic}`,
        `(list|read|repeat|say) ( |for me|to me) all ${sayingsAlternatives} ${aboutAlternatives} {topic}`,
        `(find|get) ( |for me|me) all ${sayingsAlternatives} ${aboutAlternatives} {topic}`,
        `tell ( |to me|me) all ${sayingsAlternatives} ${aboutAlternatives} {topic}`,
    ],
    GetOnePhraseAtRandomIntent: [
        `( |a) random ${sayingAlternatives}`,
        `(list|read|repeat|say) ( |for me|to me) a random ${sayingAlternatives}`,
        `(find|get) ( |for me|me) a random ${sayingAlternatives}`,
        `tell ( |to me|me) a random ${sayingAlternatives}`
    ],
    GetOnePhraseByTopicIntent: [],
    GetTopicsListIntent: []
};

console.log(generator(intents).toString());
