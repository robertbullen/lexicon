export interface ImplicitIntents {
    LaunchRequest: any;
    Unhandled: any;
}

export interface RequiredIntents {
    'AMAZON.CancelIntent': any;
    'AMAZON.HelpIntent': any;
    'AMAZON.StopIntent': any;
}

export interface CustomIntents {
    GetAllPhrasesByTopicIntent: any;
    GetOnePhraseAtRandomIntent: any;
    GetOnePhraseByTopicIntent: any;
    GetTopicsListIntent: any;
}
