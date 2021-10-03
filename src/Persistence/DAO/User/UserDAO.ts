import { Role } from "@Common/entities/Role";
import { User } from "@Common/entities/User";
import { GeneralError } from "@Common/errors/GeneralError";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { UserDBFunctions } from "@Persistence/database/functions/UserDBFunctions";
import { DAO } from "../DAO";
import { IUserDAO } from "./IUserDAO";

export class UserDAO extends DAO<User> implements IUserDAO {

    async login(where: User): Promise<User> {
        console.info(`Loging in`, where.email);
        let email = where.email;
        let password = where.password;
        if (!email || !password) {
            throw new RequiredFieldError('email and password');
        }
        let query = UserDBFunctions.login(email, password);
        let result = await Database.shared.execute(query, User);
        if (result.length > 0) {
            return result[0];
        }
        return Promise.reject('Email or password empty')
    }

    async getRoles(where?: User): Promise<Role[]> {
        console.info(`Getting roles`, where?.roleId);
        let query = UserDBFunctions.getRoles(where?.roleId);
        let result = await Database.shared.execute(query, Role);
        return result;
    }

    async get(where?: User, limit?: number, skip?: number): Promise<User[]> {
        console.info(`Getting users`, where?.id);
        let query = UserDBFunctions.getUsers(where?.id);
        let result = await Database.shared.execute(query, User);
        return result;
    }

    create(entity: User): Promise<User> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    update(where: User, entity: User): Promise<User> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    delete(entity: User): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}