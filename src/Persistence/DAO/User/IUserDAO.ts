import { Role } from "@Common/Entities/Role";
import { User } from "@Common/Entities/User";
import { IDAO } from "../IDAO";

export interface IUserDAO extends IDAO<User> {
    login(where: User): Promise<User>;

    getRoles(where?: User): Promise<Role[]>
}