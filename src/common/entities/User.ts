import { Decodable } from "@Common/Utils/decodable";
import { Entity } from "./Entity";
import { Role } from "./Role";

export class User extends Entity implements Decodable {
    id?: number;
    roleId?: number;
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    roles?: Role[];

   constructor(entity?: User) {
        super(entity);
        this.id = entity ? entity.id : undefined;
        this.roleId = entity ? entity.roleId : undefined
        this.name = entity ? entity.name : undefined;
        this.email = entity ? entity.email : undefined;
        this.password = entity ? entity.password : undefined;
        this.createdAt = entity ? entity.createdAt : undefined;
        this.roles = entity ? entity.roles : undefined;
   }

   codingKeys = {
       id: 'usr_id',
       roleId: 'usr_role_id',
       name: 'usr_name',
       email: 'usr_email',
       createdAt: 'usr_created_at'
   }
}