import { Entity } from "@Common/Entities/Entity";


export interface Decodable {
    codingKeys: CodingKey<Entity>;
}

export type CodingKey<T extends Entity> = {
    readonly [P in keyof T]?: string;
}

export function decode<T extends Decodable>(entity: Entity, type: { new(): T }): T {
    let instance = new type();
    let codingKeys = instance.codingKeys
    if (!codingKeys) {
        return instance;
    }
    Object.keys(entity).forEach((key) => {
        Object.keys(codingKeys!).forEach((modelKey) => {
            // @ts-ignore
            if (codingKeys[modelKey] === key) {
                // @ts-ignore
                instance[modelKey] = entity[key];
            }
        });
    })
    return instance;
}