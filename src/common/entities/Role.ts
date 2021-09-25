import { Decodable } from "@Common/Utils/decodable";
import { Entity } from "./Entity";

export class Role extends Entity implements Decodable {
    id?: number;
    name?: string;

    constructor(entity?: Role) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.name = entity ? entity.name : undefined;
    }

    codingKeys = {
        id: 'rol_id',
        name: 'rol_name'
    }
}