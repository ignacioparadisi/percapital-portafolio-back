import { Role } from "@Common/entities/Role";
import { User } from "@Common/entities/User";
import { IDAO } from "../IDAO";

export interface IUserDAO extends IDAO<User> {
    login(where: User): Promise<User>;

    getRoles(where?: User): Promise<Role[]>
}