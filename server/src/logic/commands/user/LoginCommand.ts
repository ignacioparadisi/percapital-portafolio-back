import { User } from "@Common/entities/User";
import { UserDAO } from "@Persistence/dao/user/UserDAO";
import { Command } from "../Command";

export class LoginCommand extends Command<User, User> {

    execute() {
        return new UserDAO().login(this.params);
    }
}