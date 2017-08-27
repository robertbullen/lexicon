import * as alexa  from 'alexa-sdk';
import * as lambda from 'aws-lambda';

import * as handlers from './src/handlers';

const handler: lambda.Handler = (
    event: alexa.RequestBody<any>,
    context: lambda.Context & alexa.Context,
    _callback: lambda.Callback // tslint:disable-line:variable-name
) => {
    console.log(JSON.stringify(event, null, 2));

    // Construct an AlexaObject and execute it.
    const alexaObject: alexa.AlexaObject<any> = alexa.handler(event, context);
    alexaObject.appId = 'amzn1.ask.skill.5350392a-8244-473a-85ac-81bfe7034fb9';
    alexaObject.registerHandlers(handlers.handlers);
    alexaObject.execute();
};

export default handler;
