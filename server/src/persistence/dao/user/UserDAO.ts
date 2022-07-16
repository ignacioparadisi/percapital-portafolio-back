import { Role } from "@Common/entities/Role";
import { User } from "@Common/entities/User";
import { GeneralError } from "@Common/errors/GeneralError";
import { Database } from "@Persistence/database/DB";
import { UserDBFunctions } from "@Persistence/database/functions/UserDBFunctions";
import { DAO } from "../DAO";
import { IUserDAO } from "./IUserDAO";

export class UserDAO extends DAO<User> implements IUserDAO {

    async login(where: User): Promise<User> {
        console.info(`Loging in`, where.email);
        let query = UserDBFunctions.login(where.email!);
        let result = await Database.shared.execute(query, User);
        if (result.length > 0) {
            return result[0];
        }
        throw new GeneralError('Usuario o contraseña inválidos', null, 'INVALID_CREDENTIALS');
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

    async create(entity: User): Promise<User> {
        console.info('Creating user');
        let query = UserDBFunctions.createUser(entity);
        let result = await Database.shared.execute(query, User);
        if (result.length > 0) {
            return result[0];
        }
        throw new GeneralError('El email ingresado ya existe en el sistema.', null, 'EMAIL_ALREADY_EXISTS');
    }

    update(where: User, entity: User): Promise<User> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    delete(entity: User): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}