import { User } from "@Common/entities/User";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { UserDAO } from "@Persistence/dao/user/UserDAO";
import { Command } from "../Command";
import * as bcrypt from 'bcryptjs';

export class LoginCommand extends Command<User, User> {

    async execute() {
        let email = this.params.email;
        let password = this.params.password;
        if (!email) {
            throw new RequiredFieldError('email');
        }
        if (!password) {
            throw new RequiredFieldError('password');
        }
        let user = await new UserDAO().login(this.params);
        if (await this.passwordIsCorrect(user, password)) {
            return user;
        }
        return Promise.reject('Wrong user or password');
    }

    private async passwordIsCorrect(user: User, password: string): Promise<boolean> {
        if (user && user.password) {
            if (await bcrypt.compare(password, user.password)) {
                user.password = undefined;
                return true;
            }
        }
        return false;
    }
}