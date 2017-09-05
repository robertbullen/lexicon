import * as deepFreeze   from 'deep-freeze';
import * as shuffleArray from 'shuffle-array';

const georgeVariations: ReadonlyArray<string> = deepFreeze([
    'George',
    'Grandpa',
    'Grandpa George'
]);

export function george(): string {
    return shuffleArray.pick(georgeVariations);
}

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
    // TODO: SSML
    'Grandpa, grandpa, grandpa!',
    'That silly old man!',
    'What a character!',
    'He sure was a fountain of phrases!'
]);

export function addPrologueAndEpilogue(text: string): string {
    let response: string = `${george()} ${shuffleArray.pick(saidVariations)}, ${text}`;
    if (Math.random() <= 0.333) {
        response += ` ${shuffleArray.pick(commentaryVariations)}`;
    }
    return response;
}

const okayVariations: ReadonlyArray<string> = deepFreeze([
    'Okay.',
    'No problem.',
    'Will do.',
    'You got it.',
    'Your wish is my command.',
    'Sure thing.'
]);

export function okay(): string {
    return shuffleArray.pick(okayVariations);
}

export const sayingVariations: ReadonlyArray<string> = deepFreeze([
    'expression',
    'phrase',
    'saying'
]);

export function saying(): string {
    return shuffleArray.pick(sayingVariations);
}

export const sayingsVariations: ReadonlyArray<string> = deepFreeze([
    'expressions',
    'phrases',
    'sayings'
]);

export function sayings(): string {
    return shuffleArray.pick(sayingsVariations);
}

export function sayingOrSayings(count: number): string {
    return count === 1 ? saying() : sayings();
}
