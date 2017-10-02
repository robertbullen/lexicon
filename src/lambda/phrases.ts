import * as shuffleArray from 'shuffle-array';

import * as topics     from '../common/topics';
import * as variations from '../common/variations';

import * as lexicon from './lexicon';

export interface Phrase {
    id: string;
    phrase: string;
    explanation: string;
    topicIds: topics.TopicId[];
}

export function getOneAtRandom(): Readonly<Phrase> {
    return shuffleArray.pick(lexicon.phrases);
}

export function getAllWithTopicIdOrThrow(topicId: topics.TopicId, order: 'shuffled' | 'sorted'): Array<Readonly<Phrase>> {
    const matchingPhrases: Array<Readonly<Phrase>> = lexicon.phrases.filter((phrase: Phrase) => phrase.topicIds.indexOf(topicId) >= 0);

    // If no phrases were found then the topic shouldn't exist.
    if (matchingPhrases.length === 0) {
        throw new Error(`No phrases were found under topic '${topicId}'`);
    }

    // Order the results, either randomizing them or sorting them by id (for the sake of consistency).
    switch (order) {
        case 'shuffled':
            return shuffleArray(matchingPhrases);

        case 'sorted':
            return matchingPhrases.sort((a: Readonly<Phrase>, b: Readonly<Phrase>) => a.id.localeCompare(b.id));

        default:
            throw new Error(`Unsupported order '${order}'`);
    }
}

export function generateResponseText(phrase: Phrase, explain: boolean): string {
    const responseText: string = explain && phrase.explanation
        ? `"${phrase.phrase}" ${phrase.explanation}`
        : `"${phrase.phrase}"`;
    return responseText.replace(/George/g, variations.george.pick());
}
