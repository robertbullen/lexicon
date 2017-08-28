import * as alexa from 'alexa-sdk';

import * as phrases    from './phrases';
import * as topics     from './topics';
import * as utils      from './utils';
import * as variations from './variations';

export const handlers: alexa.Handlers<any> = {
    'LaunchRequest'(this: alexa.Handler<any>): void {
        const responseText: string = `
            Welcome to The George Schwartz Lexicon, where ${variations.george()}'s ${variations.sayings()} are just a voice command away.
            If you'd like instructions on how to use The Lexicon, simply say "Help." Otherwise, is there a ${variations.saying()} you're looking for?`;

        console.log(responseText);
        this.emit(':ask', responseText);
    },

    'Unhandled'(this: alexa.Handler<any>): void {
        this.emit('GetPhraseAtRandomIntent');
    },

    'AMAZON.CancelIntent'(this: alexa.Handler<any>): void {
        const responseText: string = variations.okay();

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    'AMAZON.HelpIntent'(this: alexa.Handler<any>): void {
        const responseText: string = `
            There are several ways to interact with The Lexicon. Here are some examples:
            First, "Tell me a random ${variations.saying()}.";
            Second, "Find a ${variations.saying()} about work.";
            Third, "List all ${variations.sayings()} about food.";
            Fourth, "List topics.";
            To repeat these instructions, say, "Help".`;

        console.log(responseText);
        this.emit(':ask', responseText);
    },

    'AMAZON.StopIntent'(this: alexa.Handler<any>): void {
        const responseText: string = variations.okay();

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    'GetOnePhraseAtRandomIntent'(this: alexa.Handler<any>): void {
        const phrase: phrases.Phrase = phrases.getOneAtRandom();

        let responseText: string = phrases.generateResponseText(phrase, true);
        responseText = variations.addPrologueAndEpilogue(responseText);

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    'GetOnePhraseByTopicIntent'(this: alexa.Handler<any>): void {
        const intentRequest = this.event.request as alexa.IntentRequest;
        const topicSlot: alexa.SlotValue = topics.getSlotFromIntentRequestOrThrow(intentRequest);
        const topicId: topics.TopicId | undefined = topics.getTopicIdFromSlot(topicSlot);

        let responseText: string;
        if (topicId) {
            const phrasesArray: Array<Readonly<phrases.Phrase>> = phrases.getAllWithTopicIdOrThrow(topicId, 'shuffled');
            responseText = variations.addPrologueAndEpilogue(phrases.generateResponseText(phrasesArray[0], true));
        } else {
            responseText = generateUnrecognizedTopicResponseText(topicSlot);
        }

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    'GetAllPhrasesByTopicIntent'(this: alexa.Handler<any>): void {
        const intentRequest = this.event.request as alexa.IntentRequest;
        const topicSlot: alexa.SlotValue = topics.getSlotFromIntentRequestOrThrow(intentRequest);
        const topicId: topics.TopicId | undefined = topics.getTopicIdFromSlot(topicSlot);

        let responseText: string;
        if (topicId) {
            const phrasesArray: Array<Readonly<phrases.Phrase>> = phrases.getAllWithTopicIdOrThrow(topicId, 'sorted');
            responseText = `I found ${phrasesArray.length} ${variations.sayingOrSayings(phrasesArray.length)} under the topic "${topics.getOneFriendlyText(topicId)}": `;
            responseText += utils.generateListText(phrasesArray.map((phrase: phrases.Phrase) => phrases.generateResponseText(phrase, false)));
        } else {
            responseText = generateUnrecognizedTopicResponseText(topicSlot);
        }

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    'GetTopicsListIntent'(this: alexa.Handler<any>): void {
        const responseText: string = `${variations.sayings()} in The Lexicon fall under the following topics: ${topics.getAllFriendlyTexts()}.`;

        console.log(responseText);
        this.emit(':tell', responseText);
    }
};

function generateUnrecognizedTopicResponseText(topicSlot: alexa.SlotValue): string {
    return `I'm sorry, but I can't find any phrases in The Lexicon about "${topicSlot.value}".`;
}
