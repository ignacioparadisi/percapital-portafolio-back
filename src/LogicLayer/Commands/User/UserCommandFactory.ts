import { User } from "@Common/Entities/User";
import { GetRolesCommand } from "./GetRolesCommand";
import { LoginCommand } from "./LoginCommand";

export class UserCommandFactory {
    static createLoginCommand(where: User) {
        return new LoginCommand(where);
    }
    static createGetRolesCommand(where: User) {
        return new GetRolesCommand(where);
    }
}