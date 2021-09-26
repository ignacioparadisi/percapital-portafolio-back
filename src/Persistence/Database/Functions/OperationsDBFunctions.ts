export class OperationsDBFunctions {
    public static getSellOperations(userId: number): string {
        return `SELECT * FROM get_sell_operations(${userId})`;
    } 
}