/**
 * In lieu of an "Elvis" operator for JavaScript (see proposal TC39 at https://github.com/tc39/proposal-optional-chaining),
 * this function can attempt to navigate an object property chain, and failing that, return undefined. See
 * https://silvantroxler.ch/2017/avoid-cannot-read-property-of-undefined/ for a discussion of this solution.
 *
 * @param fn A function that attempts to navigate a property chain and throws an error if unsuccessful.
 */
export function getSafely<T>(fn: () => T): T | undefined {
    try {
        return fn();
    } catch (error) {
        return undefined;
    }
}

export function generateListText(items: string[]): string {
    const lastIndex: number = items.length - 1;
    const lastItem: string = items[lastIndex];
    items[lastIndex] = `and ${lastItem}`;
    const listText: string = items.join(', ');
    items[lastIndex] = lastItem;
    return listText;
}
