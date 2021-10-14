export class OperationTypeDBFunctions {
    public static getOperationTypeForOperation(operationTypeId: number): string {
        return `SELECT * FROM get_operation_type(${operationTypeId})`;
    }

    public static getOperationTypes(): string {
        return `SELECT id AS ot_id, name AS ot_name FROM Operation_Type`;
    }
}