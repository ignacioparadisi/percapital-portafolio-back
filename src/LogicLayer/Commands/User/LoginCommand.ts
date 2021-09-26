import { User } from "@Common/Entities/User";
import { UserDAO } from "@Persistence/DAO/User/UserDAO";
import { Command } from "../Command";

export class LoginCommand extends Command<User, User> {

    private user: User;

    constructor(user: User) {
        super(user);
        this.user = user;
    }

    execute() {
        return new UserDAO().login(this.user);
    }
}