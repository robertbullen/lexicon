# The George Schwartz Lexicon Alexa Skill

## TODOs

* ~~Add an intent to list all phrases under a topic~~
* Save the IDs of phrases recently sent to the user and avoid repeating them
* Favor phrases containing the actual spoken word (or variations of it)
* Add "with/without explanation" intents
* Add more utterances that include "find" and "what George would say"
* Add typings for slot resolutions. Here's a JSON example:

```json
"intent": {
    "name": "GetPhraseByTopicIntent",
    "confirmationStatus": "NONE",
    "slots": {
        "topic": {
            "name": "topic",
            "value": "newspaper",
            "resolutions": {
                "resolutionsPerAuthority": [
                    {
                        "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.5350392a-8244-473a-85ac-81bfe7034fb9.Topic",
                        "status": {
                            "code": "ER_SUCCESS_MATCH"
                        },
                        "values": [
                            {
                                "value": {
                                    "name": "work",
                                    "id": "WORK"
                                }
                            }
                        ]
                    }
                ]
            },
            "confirmationStatus": "NONE"
        }
    }
}
```
