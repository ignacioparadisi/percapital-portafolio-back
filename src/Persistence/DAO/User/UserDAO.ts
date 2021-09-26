import { Role } from "@Common/Entities/Role";
import { User } from "@Common/Entities/User";
import { GeneralError } from "@Common/Errors/GeneralError";
import { decode, decodeMultiple } from "@Common/Utils/decodable";
import { Database } from "@Persistence/Database/DB";
import { UserDBFunctions } from "@Persistence/Database/Functions/UserDBFunctions";
import { DAO } from "../DAO";
import { IUserDAO } from "./IUserDAO";

export class UserDAO extends DAO<User> implements IUserDAO {

    async login(where: User): Promise<User> {
        console.info(`Loging in`, where.email);
        let email = where.email;
        let password = where.password;
        if (!email || !password) {
            return Promise.reject('Email or password empty');
        }
        let result = await Database.shared.execute(UserDBFunctions.login(email, password));
        console.log(result)
        if (result.length > 0) {
            return decode(result[0], User);
        }
        return Promise.reject('Email or password empty')
    }

    async getRoles(where?: User): Promise<Role[]> {
        console.info(`Getting roles`, where?.roleId);
        let query = UserDBFunctions.getRoles(where?.roleId);
        let result = await Database.shared.execute(query);
        return decodeMultiple(result, Role);
    }

    async get(where?: User, limit?: number, skip?: number): Promise<User[]> {
        console.info(`Getting users`, where?.id);
        let query = UserDBFunctions.getUsers(where?.id);
        let results = await Database.shared.execute(query);
        console.log(results);
        return decodeMultiple(results, User);
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