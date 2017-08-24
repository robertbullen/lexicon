// The type definitions in @types/shuffle-array for the `pick()` function aren't quite accurate, so this file augments
// those definitions with improvements.
//
// First, @types/shuffle-array stipulates that `pick()` must receive a full-fledged `Array<T>` as its first argument,
// but `pick()` doesn't modify the given array, so ReadonlyArray<T> is a better fit for these requirements. (Actually,
// it could accept an `ArrayLike<T> & { slice(start?: number, end?: number): T[]; }` type, but that might be taking
// things too far!). This improved definition allows `pick()` to work with _both_ mutable and frozen/read-only arrays.
//
// Second, its second argument's type is `Object`, when it should be `PickOption`.

declare module 'shuffle-array' {

    /**
     * copy - Sets if should return a shuffled copy of the given array. By default it's a falsy value.
     * rng - Specifies a custom random number generator.
     */
    interface ShuffleOption {
        copy?: boolean;
        rng?: () => number;
    }

    /**
     * picks - Specifies how many random elements you want to pick. By default it picks 1.
     * rng - Specifies a custom random number generator.
     */
    interface PickOption {
        picks?: number;
        rng?: () => number;
    }

    interface ShuffleArray {
        /**
         * Randomizes the order of the elements in a given array.
         *
         * arr - The given array.
         * options - Optional configuration options.
         */
        <T>(arr: T[], options?: ShuffleOption): T[];

        /**
         * Pick one or more random elements from the given array.
         *
         * arr - The given array.
         * options - Optional configuration options.
         */
        pick<T>(arr: ReadonlyArray<T>): T;
        pick<T>(arr: ReadonlyArray<T>, options: PickOption): T | T[];
    }

    const shuffle: ShuffleArray;
    export = shuffle;
}
