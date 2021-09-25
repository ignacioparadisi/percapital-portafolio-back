import { Role } from "@Common/Entities/Role";
import { User } from "@Common/Entities/User";
import { UserDAO } from "@Persistence/DAO/User/UserDAO";
import { Command } from "../Command";

export class GetRolesCommand extends Command<User, Role[]> {

    private user: User;

    constructor(user: User) {
        super(user);
        this.user = user;
    }

    execute() {
        return new UserDAO().getRoles(this.user);
    }
}