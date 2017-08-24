import * as deepFreeze   from 'deep-freeze';
import * as shuffleArray from 'shuffle-array';

const georgeVariations: ReadonlyArray<string> = deepFreeze([
    'George',
    'Grandpa',
    'Grandpa George',
    'He'
]);

const saidVariations: ReadonlyArray<string> = deepFreeze([
    'used to say',
    'would say',
    'said',
    'was known to say',
    'sometimes said',
    'was quoted saying',
    'was heard saying'
]);

const commentaryVariations: ReadonlyArray<string> = deepFreeze([
    'What a card!',
    'Grandpa, grandpa, grandpa.',
    'That silly old man.',
    'What a character!',
    'He sure was a fountain of phrases.'
]);

const okayVariations: ReadonlyArray<string> = deepFreeze([
    'Okay.',
    'No problem.',
    'Will do.',
    'You got it.',
    'Your wish is my command.'
]);

export function addPrologueAndEpilogue(text: string): string {
    let response: string = `${shuffleArray.pick(georgeVariations)} ${shuffleArray.pick(saidVariations)}, ${text}`;
    if (Math.random() <= 0.333) {
        response += ` ${shuffleArray.pick(commentaryVariations)}`;
    }
    return response;
}

export function getOkayVariation(): string {
    return shuffleArray.pick(okayVariations);
}
