export class OperationsDBFunctions {
    public static getSellOperations(userId: number, limit?: number, offset?: number): string {
        return `SELECT * FROM get_sell_operations(${userId})`;
    } 
}