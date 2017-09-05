import * as deepFreeze   from 'deep-freeze';

import {Phrase}  from './phrases';
import {TopicId} from './topics';

export const phrases: ReadonlyArray<Readonly<Phrase>> = deepFreeze([
    {
        id: '37c38182-f3e7-4c43-9a04-f29247908af1',
        phrase: 'Having a kid is like buying a pig in a poke!',
        explanation: "It was George's way of expressing the uncertainty of not knowing how your own offspring will turn out.",
        topicIds: [TopicId.animals, TopicId.family]
    },
    {
        id: '0fe1b68a-46ea-4af7-89ec-69882d5c2b04',
        phrase: 'One over quota.',
        explanation: 'This is because George and Marcile had four children whereas they came from families with three.',
        topicIds: [TopicId.family]
    },
    {
        id: 'f8d5bcdb-9ef8-4fb5-9268-455768fa2d66',
        phrase: 'Pour the coal on.',
        explanation: 'George coopted this saying from his work buddy Don Holt.',
        topicIds: [TopicId.work]
    },
    {
        id: '6c945ae2-894b-4932-a2ea-5534b0d049b0',
        phrase: 'If anybody is going to eat, someone has to sell.',
        explanation: 'George adopted this phrase from his work pal Scoop Heuerman.',
        topicIds: [TopicId.work]
    },
    {
        id: 'a4901ee2-dbc2-40a0-b7d9-9018a3a88b25',
        phrase: 'It’s gotten so I can’t hardly say a sentence in the English language without either a saying, cliché, or bon mot.',
        explanation: '',
        topicIds: [TopicId.words]
    },
    {
        id: '160c7a1d-cfe3-4d94-af94-f13d96e4e25b',
        phrase: 'Atlanta Subsidiaries.',
        explanation: 'George used this term for the Vitts.',
        topicIds: [TopicId.family, TopicId.nicknames]
    },
    {
        id: '3de38317-2c56-4840-8d6e-dbaa3ecd7d19',
        phrase: 'Wisconsin Dignitaries.',
        explanation: 'George used this term for the and Eckblads.',
        topicIds: [TopicId.family, TopicId.nicknames]
    },
    {
        id: '65bff28e-0d26-4dbd-b69c-5ca96ac5d555',
        phrase: 'Outlaws!',
        explanation: 'This is what George called his inlaws.',
        topicIds: [TopicId.family, TopicId.nicknames]
    },
    {
        id: '2d06afa6-fd94-4708-bb58-b37c011d2350',
        phrase: 'Bucky Beaver.',
        explanation: 'George used this term as a parody of the Bucky Badger mascot, played by Rebecca while she attended The University of Wisconsin Madison.',
        topicIds: [TopicId.animals, TopicId.family, TopicId.nicknames]
    },
    {
        id: '015d6a39-8b2c-4e44-942b-5c8471762652',
        phrase: 'The Crow.',
        explanation: 'George used this term as a parody on the Osseo Oriole mascot, played by Rebecca while she attended Osseo Senior Highschool.',
        topicIds: [TopicId.animals, TopicId.family, TopicId.nicknames]
    },
    {
        id: '4fc945ed-03c1-4dd5-8fed-7933b630e556',
        // TODO: SSML
        phrase: 'Nurse Cratched.',
        explanation: 'This was George referring to any female family member currently providing his health care.',
        topicIds: [TopicId.family, TopicId.health, TopicId.nicknames]
    },
    {
        id: 'da3580bf-f423-48fa-8fae-84d62708a9a3',
        phrase: 'Not that we’re prejudice.',
        explanation: "This was George and Marcile's way of sarcastically excluding themselves from any relative favoritism.",
        topicIds: [TopicId.family]
    },
    {
        id: '8f7f51de-9cf4-4151-b0f2-bcdba30e6ccd',
        phrase: 'Relatives are like fish, they stink after three days.',
        explanation: "This was George's way of expressing how the everpresence of visiting relatives starts to wear thin after a while.",
        topicIds: [TopicId.animals, TopicId.family]
    },
    {
        id: '336ad00a-980b-4eb7-a817-9e0baba58f79',
        phrase: 'We belong to a Mutual Admiration Society.',
        explanation: 'This was George explaining that he and another in the family love each other.',
        topicIds: [TopicId.family]
    },
    {
        id: '0436f997-97f4-4f98-84c6-46ee3224e2c5',
        phrase: 'Oleo.',
        explanation: 'Oleo is another term for margarine.',
        topicIds: [TopicId.food, TopicId.words]
    },
    {
        id: 'bd013162-0fa9-4f2a-926f-dc14e52abbb8',
        phrase: 'Train case.',
        explanation: 'A train case is a small, hard-sided travel case for toiletries.',
        topicIds: [TopicId.words]
    },
    {
        id: '081b848d-afe2-4acb-a2f7-b27790313272',
        phrase: 'Oater.',
        explanation: 'An oater is a western movie.',
        topicIds: [TopicId.words]
    },
    {
        id: '3bf98d1e-119f-4203-9f88-23e88e801af2',
        phrase: 'Black cow.',
        explanation: 'A black cow is a slang term for root beer float.',
        topicIds: [TopicId.animals, TopicId.food, TopicId.words]
    },
    {
        id: '3f8bb591-74f0-44f2-8159-4ee047f29446',
        phrase: 'Galoshes.',
        explanation: 'Galoshes are slip-on waterproof overshoes.',
        topicIds: [TopicId.clothing, TopicId.words]
    },
    {
        id: '62ce3c65-6b81-4872-88d5-bd45c9901d54',
        phrase: 'Rubbers.',
        explanation: 'Rubbers are slip-on waterproof overshoes.',
        topicIds: [TopicId.clothing, TopicId.words]
    },
    {
        id: '8a1d7586-f002-471f-8c43-4bd696c2eec0',
        phrase: 'Icebox.',
        explanation: 'An icebox is an ice-cooled refrigerator.',
        topicIds: [TopicId.food, TopicId.words]
    },
    {
        id: '8dce854c-aa56-4c1d-821b-eddccdc96fdd',
        phrase: 'Semaphore.',
        explanation: 'A semaphore is a traffic intersection with stoplights.',
        topicIds: [TopicId.words]
    },
    {
        id: '2b79b822-53a2-49f5-897f-46322cd24410',
        phrase: 'Labation.',
        explanation: 'A libation is an alcoholic beverage.',
        topicIds: [TopicId.food, TopicId.words]
    },
    {
        id: 'f8ea1549-b364-43bf-bd76-b56ad2b3c467',
        phrase: 'Owly.',
        explanation: 'Owly is an adjective that means irritated, out of sorts, or grumpy.',
        topicIds: [TopicId.animals, TopicId.words]
    },
    {
        id: '2a0b4696-c33f-4008-bc5f-4bfb05729faa',
        phrase: 'Davenport.',
        explanation: 'A davenport is a large sofa.',
        topicIds: [TopicId.words]
    }
    /*
    {
        id: '',
        phrase: '',
        explanation: '',
        topicIds: [TopicId.]
    }

“I’m suffering from a case of ‘Beckyitis.’”
(When George is missing or
talking excessively about his granddaughter.)
*/
]);
