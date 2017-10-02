declare module 'intent-utterance-expander' {

    function intentUtteranceExpand(phrase: string): string[];

    // This is a workaround for "error TS2497: Module ''intent-utterance-expander'' resolves to a non-module entity
    // and cannot be imported using this construct." See https://github.com/Microsoft/TypeScript/issues/6656.
    module intentUtteranceExpand { }

    export = intentUtteranceExpand;
}
