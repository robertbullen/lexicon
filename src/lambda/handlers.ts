import * as alexa from 'alexa-sdk';

import * as intents    from '../common/intents';
import * as topics     from '../common/topics';
import * as utils      from '../common/utils';
import * as variations from '../common/variations';

import * as commentary from './commentary';
import * as phrases    from './phrases';

type AllIntents = intents.ImplicitIntents & intents.RequiredIntents & intents.CustomIntents;
type HandlerMethod = (this: alexa.Handler<any>) => void;
type Handlers = { [P in keyof AllIntents]: HandlerMethod };

export const handlers: Handlers = {
    LaunchRequest(this: alexa.Handler<any>): void {
        const responseText: string = `
            Welcome to The George Schwartz Lexicon, where ${variations.georges.pick()} ${variations.sayings.pick()} are just a voice command away.
            If you'd like instructions on how to use The Lexicon, simply say "Help." Otherwise, is there a ${variations.saying.pick()} you're looking for?`;

        console.log(responseText);
        this.emit(':ask', responseText);
    },

    Unhandled(this: alexa.Handler<any>): void {
        this.emit('GetPhraseAtRandomIntent');
    },

    'AMAZON.CancelIntent'(this: alexa.Handler<any>): void {
        const responseText: string = commentary.okay.pick();

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    'AMAZON.HelpIntent'(this: alexa.Handler<any>): void {
        const responseText: string = `
            There are several ways to interact with The Lexicon. Here are some examples:
            First, "Tell me a random ${variations.saying.pick()}.";
            Second, "Find a ${variations.saying.pick()} about work.";
            Third, "List all ${variations.sayings.pick()} about food.";
            Fourth, "List topics.";
            To repeat these instructions, say, "Help".`;

        console.log(responseText);
        this.emit(':ask', responseText);
    },

    'AMAZON.StopIntent'(this: alexa.Handler<any>): void {
        const responseText: string = commentary.okay.pick();

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    GetAllPhrasesByTopicIntent(this: alexa.Handler<any>): void {
        const intentRequest = this.event.request as alexa.IntentRequest;
        const topicSlot: alexa.SlotValue = topics.getSlotFromIntentRequestOrThrow(intentRequest);
        const topicId: topics.TopicId | undefined = topics.getTopicIdFromSlot(topicSlot);

        let responseText: string;
        if (topicId) {
            const phrasesArray: Array<Readonly<phrases.Phrase>> = phrases.getAllWithTopicIdOrThrow(topicId, 'sorted');
            responseText = `I found ${phrasesArray.length} ${variations.sayingOrSayings(phrasesArray.length)} under the topic "${topics.TopicId.getTitle(topicId)}": `;
            responseText += utils.generateListText(phrasesArray.map((phrase: phrases.Phrase) => phrases.generateResponseText(phrase, false)));
        } else {
            responseText = generateUnrecognizedTopicResponseText(topicSlot);
        }

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    GetOnePhraseAtRandomIntent(this: alexa.Handler<any>): void {
        const phrase: phrases.Phrase = phrases.getOneAtRandom();

        let responseText: string = phrases.generateResponseText(phrase, true);
        responseText = commentary.addPrologueAndEpilogue(responseText);

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    GetOnePhraseByTopicIntent(this: alexa.Handler<any>): void {
        const intentRequest = this.event.request as alexa.IntentRequest;
        const topicSlot: alexa.SlotValue = topics.getSlotFromIntentRequestOrThrow(intentRequest);
        const topicId: topics.TopicId | undefined = topics.getTopicIdFromSlot(topicSlot);

        let responseText: string;
        if (topicId) {
            const phrasesArray: Array<Readonly<phrases.Phrase>> = phrases.getAllWithTopicIdOrThrow(topicId, 'shuffled');
            responseText = commentary.addPrologueAndEpilogue(phrases.generateResponseText(phrasesArray[0], true));
        } else {
            responseText = generateUnrecognizedTopicResponseText(topicSlot);
        }

        console.log(responseText);
        this.emit(':tell', responseText);
    },

    GetTopicsListIntent(this: alexa.Handler<any>): void {
        const titles: string[] = topics.Topic.all.map((topic: topics.Topic) => topics.TopicId.getTitle(topic.id));
        const responseText: string = `${variations.sayings.pick()} in The Lexicon fall under the following topics: ${utils.generateListText(titles)}.`;

        console.log(responseText);
        this.emit(':tell', responseText);
    }
};

function generateUnrecognizedTopicResponseText(topicSlot: alexa.SlotValue): string {
    return `I'm sorry, but I can't find any phrases in The Lexicon about "${topicSlot.value}".`;
}
