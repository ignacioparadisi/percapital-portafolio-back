export class ConstantDBFunctions {
    public static getConstants(id?: number): string {
        return `SELECT * FROM get_constant_types(${ id ? id : null })`;
    }
}