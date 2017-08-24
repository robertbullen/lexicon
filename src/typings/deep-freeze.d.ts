declare module 'deep-freeze' {

    interface DeepFreeze {
        <T>(x: T): Readonly<T>;
        <T>(x: T[]): ReadonlyArray<Readonly<T>>;
    }

    const deepFreeze: DeepFreeze;
    export = deepFreeze;
}
