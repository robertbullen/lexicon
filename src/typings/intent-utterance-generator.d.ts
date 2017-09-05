declare module 'intent-utterance-generator' {

    function generator(intents: Record<string, string | string[]>): Buffer;

    export = generator;
}
