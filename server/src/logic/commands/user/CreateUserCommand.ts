import { User } from "@Common/entities/User";
import { Command } from "../Command";
import *  as bcrypt from 'bcryptjs';
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { UserDAO } from "@Persistence/dao/user/UserDAO";

export class CreateUserCommand extends Command<User, User> {

    async execute(): Promise<User | User[]> {
        let user = this.params;
        if (!user.email) {
            throw new RequiredFieldError('email');
        }
        if (!user.name) {
            throw new RequiredFieldError('name');
        }
        if (!user.password) {
            throw new RequiredFieldError('password');
        }
        user.roleId = user.roleId ? ([1, 2].includes(user.roleId) ? user.roleId : 1) : 1;
        let password = await this.encryptPassword(user.password);
        user.password = password;
        return new UserDAO().create(user);
    }

    private async encryptPassword(password: string): Promise<string> {
        const saltRounds = 10;
        let encryptedPassword = await bcrypt.hash(password, saltRounds);
        return encryptedPassword;
    }

}