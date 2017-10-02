import * as alexa from 'alexa-sdk';
import * as deepFreeze from 'deep-freeze';

import * as utils from './utils';

export enum TopicId {
    animals = 'Animals',
    clothing = 'Clothing',
    family = 'Family',
    food = 'Food_and_Drink',
    health = 'Health',
    nicknames = 'Nicknames',
    // religion = 'Religion',
    similes = 'Similes',
    war = 'War_and_Service',
    weather = 'Weather',
    words = 'Words_and_Terms',
    work = 'Work_and_Career'
}

// tslint:disable-next-line:no-namespace
export namespace TopicId {
    export function getName(topicId: TopicId): string {
        const index: number = topicId.indexOf('_');
        return (index >= 0
            ? topicId.substring(0, index)
            : topicId).toLowerCase();
    }

    export function getTitle(topicId: TopicId): string {
        return topicId.replace(/_/g, ' ');
    }
}

export interface Topic {
    id: TopicId;
    synonyms: string[];
}

// tslint:disable-next-line:no-namespace
export namespace Topic {
    export const all: ReadonlyArray<Readonly<Topic>> = deepFreeze([
        {
            id: TopicId.animals,
            synonyms: [
                'badger',
                'beaver',
                'cat',
                'crow',
                'dog',
                'fish',
                'oriole',
                'pig'
            ]
        },
        {
            id: TopicId.clothing,
            synonyms: [
                'belt',
                'boots',
                'chapeau',
                'galoshes',
                'hat',
                'pajamas',
                'pants',
                'rubbers',
                'shirt',
                'shoes'
            ]
        },
        {
            id: TopicId.family,
            synonyms: [
                'ancestor',
                'child',
                'descendent',
                'offspring',
                'parent',
                'relative',
                'sibling'
            ],
        },
        {
            id: TopicId.food,
            synonyms: [
                'beer',
                'butter',
                'drink',
                'float',
                'libation',
                'margarine',
                'oleo',
                'root'
            ],
        },
        {
            id: TopicId.health,
            synonyms: [
                'bandage',
                'cancer',
                'care',
                'death',
                'life'
            ],
        },
        {
            id: TopicId.nicknames,
            synonyms: [
                'moniker',
                'name'
            ],
        },
        {
            id: TopicId.words,
            synonyms: [
                'English',
                'bon mot',
                'language',
                'movie',
                'phrase',
                'saying',
                'term',
                'vintage',
                'western'
            ],
        },
        {
            id: TopicId.work,
            synonyms: [
                'Star Tribune',
                'career',
                'job',
                'labor',
                'newspaper',
                'sales'
            ],
        }
    ]);

    export const typeName: string = 'Topic';
}

export function getSlotFromIntentRequestOrThrow(intentRequest: alexa.IntentRequest): alexa.SlotValue {
    const topicSlot: alexa.SlotValue | undefined = utils.getSafely(() => intentRequest.intent!.slots.topic);
    if (!topicSlot) {
        throw new Error("Slot 'topic' was not present in the intent request.");
    }
    return topicSlot;
}

export function getTopicIdFromSlot(topicSlot: alexa.SlotValue): TopicId | undefined {
    return utils.getSafely(() => topicSlot.resolutions!.resolutionsPerAuthority[0].values[0].value.id as TopicId);
}
