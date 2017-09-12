import * as alexa from 'alexa-sdk';

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

export function getOneFriendlyText(topicId: TopicId): string {
    return topicId.replace(/_/g, ' ');
}

export function getAllFriendlyTexts(): string {
    const friendlyTexts: string[] = Object.keys(TopicId)
        .map((key: string) => getOneFriendlyText(TopicId[key]));
    return utils.generateListText(friendlyTexts);
}

export function getSlotFromIntentRequestOrThrow(intentRequest: alexa.IntentRequest): alexa.SlotValue {
    const topicSlot: alexa.SlotValue | undefined = utils.getSafely(() => intentRequest.intent!.slots.topic);
    if (!topicSlot) {
        throw new Error("Slot 'topic' was not present in the intent request.");
    }
    return topicSlot;
}

export function getTopicIdFromSlot(topicSlot: alexa.SlotValue): TopicId | undefined {
    return utils.getSafely(() => (topicSlot as any).resolutions.resolutionsPerAuthority[0].values[0].value.id);
}
