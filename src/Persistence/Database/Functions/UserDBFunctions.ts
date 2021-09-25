export class UserDBFunctions {
    public static login(email: string, password: string): string {
        return `SELECT * FROM login('${ email }', '${ password }')`;
    }
    public static getRoles(roleId?: number): string {
        return `SELECT * FROM get_roles(${ roleId ? roleId : null })`;
    }
}