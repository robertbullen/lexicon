import * as deepFreeze   from 'deep-freeze';
import * as shuffleArray from 'shuffle-array';

export class Variations {
    public constructor(options: string[]) {
        this.options = deepFreeze(options);
    }

    public options: ReadonlyArray<string>;

    public pick(): string {
        return shuffleArray.pick(this.options);
    }
}

export const george = new Variations([
    'George',
    'Grandpa',
    'Grandpa George'
]);

export const georges = new Variations(george.options.map((grandpa: string) => `${grandpa}'s`));

export const saying = new Variations([
    'expression',
    'phrase',
    'saying'
]);

export const sayings = new Variations([
    'expressions',
    'phrases',
    'sayings'
]);

export function sayingOrSayings(count: number): Variations {
    return count === 1 ? saying : sayings;
}
