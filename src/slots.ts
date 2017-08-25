// tslint:disable-next-line:no-namespace
export enum TopicId {
    animals = 'Animals',
    clothing = 'Clothing',
    family = 'Family',
    food = 'Food_and_Drink',
    health = 'Health',
    nicknames = 'Nicknames',
    words = 'Words_and_Terms',
    work = 'Work_and_Career'
}

export function allTopics(): string[] {
    return Object.keys(TopicId)
        .map((key: string) => (TopicId[key] as string))
        .map((value: string) => value.replace('_', ' '));
}
