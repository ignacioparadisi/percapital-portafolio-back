import { User } from "@Common/entities/User";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { UserDAO } from "@Persistence/dao/user/UserDAO";
import { Command } from "../Command";
import * as bcrypt from 'bcryptjs';
import { GeneralError } from "@Common/errors/GeneralError";

export class LoginCommand extends Command<User, User> {

    async execute() {
        this.validateParams(this.params);
        let user = await new UserDAO().login(this.params);
        if (await this.passwordIsCorrect(user, this.params.password!)) {
            return user;
        }
        throw new GeneralError('Usuario o contraseña inválidos', null, 'INVALID_CREDENTIALS');
    }

    private validateParams(params: User) {
        if (!params.email) {
            throw new RequiredFieldError('email');
        }
        if (!params.password) {
            throw new RequiredFieldError('password');
        }
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