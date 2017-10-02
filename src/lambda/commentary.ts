import * as variations from '../common/variations';

const commentary = new variations.Variations([
    'What a card!',
    // TODO: SSML
    'Grandpa, grandpa, grandpa!',
    'That silly old man!',
    'What a character!',
    'He sure was a fountain of phrases!'
]);

const said = new variations.Variations([
    'used to say',
    'would say',
    'said',
    'was known to say',
    'sometimes said',
    'was quoted saying',
    'was heard saying'
]);

export function addPrologueAndEpilogue(text: string): string {
    let response: string = `${variations.george.pick()} ${said.pick()}, ${text}`;
    if (Math.random() <= 0.333) {
        response += ` ${commentary.pick()}`;
    }
    return response;
}

export const okay = new variations.Variations([
    'Okay.',
    'Okie Dokey',
    'No problem.',
    'Will do.',
    'You got it.',
    'Sure thing.'
]);
