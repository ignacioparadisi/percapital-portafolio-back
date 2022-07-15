import { User } from "@Common/entities/User";
import { CreateUserCommand } from "./CreateUserCommand";
import { GetRolesCommand } from "./GetRolesCommand";
import { GetUsersCommand } from "./GetUsersCommand";
import { LoginCommand } from "./LoginCommand";

export class UserCommandFactory {
    static createLoginCommand(where: User) {
        return new LoginCommand(where);
    }
    static createGetRolesCommand(where: User) {
        return new GetRolesCommand(where);
    }
    static createGetUsersCommand(where: User) {
        return new GetUsersCommand(where);
    }
    static createCreateUserCommand(insertData: User) {
        return new CreateUserCommand(insertData);
    }
}