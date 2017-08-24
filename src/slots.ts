// tslint:disable-next-line:no-namespace
export enum TopicId {
    family = 'FAMILY',
    work = 'WORK',
    jokes = 'JOKES',
    animals = 'ANIMALS'
}

export function allTopics(): string[] {
    return Object.keys(TopicId);
}
