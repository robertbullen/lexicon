export interface SlotValue {
    id: string;
    name: {
        value: string;
        synonyms: string[];
    };
}

export interface SlotType {
    name: string;
    values: SlotValue[];
}

export interface SlotReference {
    name: string;
    type: string;
    samples: string[];
}

export interface UnnamedIntentDefinition {
    samples: string[];
    slots?: SlotReference[];
}

export interface IntentDefinition extends UnnamedIntentDefinition {
    name: string;
}

export interface SkillDefinition {
    intents: IntentDefinition[];
    types: SlotType[];
}
