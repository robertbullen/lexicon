import * as alexa from 'alexa-sdk';

import {Phrase}                 from './phrases';
import {allTopics,
        TopicId}                from './slots';
import {addPrologueAndEpilogue,
        getOkayVariation}       from './variations';

export const handlers: alexa.Handlers = {
    'LaunchRequest'(this: alexa.Handler): void {
        this.emit(':tell', 'Welcome to The George Schwartz Lexicon.');
    },

    'Unhandled'(this: alexa.Handler): void {
        this.emit('GetPhraseAtRandomIntent');
    },

    'AMAZON.CancelIntent'(this: alexa.Handler): void {
        this.emit(':tell', getOkayVariation());
    },

    'AMAZON.HelpIntent'(this: alexa.Handler): void {
        this.emit(':tell', `
            You can request a random phrase by saying, "Tell me a random saying.";
            You can request phrases about specific topics, for example, "Find a phrase about work.";
            For a list of topics, say, "List topics."`);
    },

    'AMAZON.StopIntent'(this: alexa.Handler): void {
        this.emit(':tell', getOkayVariation());
    },

    'GetPhraseAtRandomIntent'(this: alexa.Handler): void {
        console.log('GetPhraseAtRandomIntent');
        const phrase: Phrase = Phrase.selectOneAtRandom();
        let text: string = Phrase.generateResponseText(phrase, true);
        text = addPrologueAndEpilogue(text);
        this.emit(':tell', text);
    },

    'GetPhraseByTopicIntent'(this: alexa.Handler): void {
        console.log('GetPhraseByTopicIntent');
        const intentRequest = this.event.request as alexa.IntentRequest;
        const topicSlot = intentRequest.intent.slots.topic;
        const topicId: TopicId = (topicSlot as any).resolutions.resolutionsPerAuthority[0].values[0].value.id;

        const phrases: Array<Readonly<Phrase>> = Phrase.selectAllMatchingTopicId(topicId);
        const text: string = phrases.length > 0
            ? addPrologueAndEpilogue(Phrase.generateResponseText(phrases[0], true))
            : `I can't find any phrases in The Lexicon about "${topicSlot.value}"`;
        this.emit(':tell', text);
    },

    'GetTopicsIntent'(this: alexa.Handler): void {
        console.log('GetTopicsIntent');
        const topics: string[] = allTopics();
        topics[topics.length - 1] = `and ${topics[topics.length - 1]}`;
        const text: string = `Phrases in The Lexicon are categorized under the following topics: ${topics.join(', ')}`;
        this.emit(':tell', text);
    }
};
