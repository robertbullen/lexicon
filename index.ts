import * as alexa  from 'alexa-sdk';
import * as lambda from 'aws-lambda';

import * as handlers from './src/handlers';

const handler: lambda.Handler = (
    event: alexa.RequestBody,
    context: lambda.Context & alexa.Context,
    _callback: lambda.Callback // tslint:disable-line:variable-name
) => {
    console.log(JSON.stringify(event, null, 2));

    // Construct an AlexaObject and execute it.
    const alexaObject: alexa.AlexaObject = alexa.handler(event, context);
    alexaObject.registerHandlers(handlers.handlers);
    alexaObject.execute();
};

export default handler;
