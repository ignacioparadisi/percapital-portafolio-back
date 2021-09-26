import { User } from "@Common/Entities/User";
import { UserDAO } from "@Persistence/DAO/User/UserDAO";
import { Command } from "../Command";

export class GetUsersCommand extends Command<User, User[]> {

    execute() {
        return new UserDAO().get(this.params);
    }
}