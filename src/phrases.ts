import * as deepFreeze   from 'deep-freeze';
import * as shuffleArray from 'shuffle-array';

import {TopicId} from './slots';

export const phrases: ReadonlyArray<Readonly<Phrase>> = deepFreeze([
    {
        id: '37c38182-f3e7-4c43-9a04-f29247908af1',
        phrase: 'Having a kid is like buying a pig in a poke!',
        explanation: 'It was his way of expressing the uncertainty of not knowing how your own offspring will turn out.',
        topicIds: [TopicId.animals, TopicId.family]
    } as Phrase,
    {
        id: '0fe1b68a-46ea-4af7-89ec-69882d5c2b04',
        phrase: 'One over quota.',
        explanation: 'This is because George and Marcile had four children whereas they came from families with three.',
        topicIds: [TopicId.family]
    },
    {
        id: 'f8d5bcdb-9ef8-4fb5-9268-455768fa2d66',
        phrase: 'Pour the coal on.',
        explanation: 'George coopted this saying from his work buddy Don Holt.',
        topicIds: [TopicId.work]
    },
    {
        id: '6c945ae2-894b-4932-a2ea-5534b0d049b0',
        phrase: 'If anybody is going to eat, someone has to sell.',
        explanation: 'George adopted this phrase from his work pal Scoop Heuerman.',
        topicIds: [TopicId.work]
    },
    {
        id: 'a4901ee2-dbc2-40a0-b7d9-9018a3a88b25',
        phrase: 'It’s gotten so I can’t hardly say a sentence in the English language without either a saying, cliché, or bon mot.',
        explanation: '',
        topicIds: [TopicId.words]
    }
]);

export interface Phrase {
    id: string;
    phrase: string;
    explanation: string;
    topicIds: TopicId[];
}

// tslint:disable-next-line:no-namespace
export namespace Phrase {
    export function selectOneAtRandom(): Readonly<Phrase> {
        return shuffleArray.pick(phrases);
    }

    export function selectAllMatchingTopicId(topicId: TopicId): Array<Readonly<Phrase>> {
        return shuffleArray(phrases.filter((phrase: Phrase) => phrase.topicIds.indexOf(topicId) >= 0));
    }

    export function generateResponseText(phrase: Phrase, explain: boolean): string {
        return explain
            ? `"${phrase.phrase}" ${phrase.explanation}`
            : `"${phrase.phrase}"`;
    }
}
