import { Role } from "@Common/entities/Role";
import { User } from "@Common/entities/User";
import { UserDAO } from "@Persistence/dao/user/UserDAO";
import { Command } from "../Command";

export class GetRolesCommand extends Command<User, Role[]> {

    execute() {
        return new UserDAO().getRoles(this.params);
    }
}