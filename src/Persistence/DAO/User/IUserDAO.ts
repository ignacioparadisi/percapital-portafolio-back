import { Role } from "@Common/Entities/Role";
import { User } from "@Common/Entities/User";
import { IDAO } from "../IDAO";

export interface IUserDAO extends IDAO<User> {
    create(entity: User): Promise<User>;

    login(where: User): Promise<User>;

    getRoles(where?: User): Promise<Role[]>

    get(
        where?: User,
        limit?: number,
        skip?: number
    ): Promise<User[]>;

    update(where: User, entity: User): Promise<User>;

    delete(entity: User): Promise<number>;
}