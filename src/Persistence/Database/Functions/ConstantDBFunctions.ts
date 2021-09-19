export class ConstantDBFunctions {
    public static getConstants(id?: number): string {
        return `SELECT * FROM get_constant_types(${ id ? id : null })`;
    }
    public static getValues(constantId: number): string {
        return `SELECT * FROM get_constant_values(${constantId})`;
    }
}