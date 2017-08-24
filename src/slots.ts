// tslint:disable-next-line:no-namespace
export enum TopicId {
    animals = 'ANIMALS',
    family = 'FAMILY',
    words = 'WORDS',
    work = 'WORK'
}

export function allTopics(): string[] {
    return Object.keys(TopicId);
}
