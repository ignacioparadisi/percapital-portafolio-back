import { User } from "@Common/entities/User";

export class UserDBFunctions {
    public static login(email: string): string {
        return `SELECT * FROM login('${ email }')`;
    }
    public static getRoles(roleId?: number): string {
        return `SELECT * FROM get_roles(${ roleId ? roleId : null })`;
    }
    public static getUsers(userId?: number): string {
        return `SELECT * FROM get_users(${ userId ? userId : null })`;
    }
    public static createUser(user: User): string {
        return `SELECT * FROM create_user('${user.name!}', '${user.email!}', '${user.password!}', ${user.roleId!})`;
    }
}