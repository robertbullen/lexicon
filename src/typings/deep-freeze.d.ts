declare module 'deep-freeze' {

    interface DeepFreeze {
        <T>(a: T[]): ReadonlyArray<Readonly<T>>;
        <T>(o: T): Readonly<T>;
    }

    const deepFreeze: DeepFreeze;
    export = deepFreeze;
}
