export class OperationsDBFunctions {
    public static getSellOperations(userId: number, limit?: number, offset?: number): string {
        return `SELECT * FROM get_sell_operations(${userId}, ${limit ? limit : null}, ${offset ? offset : null})`;
    }

    public static getBuyOperations(userId: number, limit?: number, offset?: number): string {
        return `SELECT * FROM get_buy_operations(${userId}, ${limit ? limit : null}, ${offset ? offset : null})`;
    }

    public static createOperation(titleId: number, userId: number, stockAmount: number, stockPrice: number, exchangeRate: number, typeId: number, 
        ivaCvId: number, comissionCvId: number, registerCvId: number, createdAt?: Date, otherComission?: number): string {
        return `SELECT * FROM create_operation(${titleId}, ${userId}, ${stockAmount}, ${stockPrice}, ${exchangeRate}, ${typeId}, ${ivaCvId}, ${comissionCvId}, ${registerCvId}, ${createdAt ? `'${createdAt}'` : null}, ${otherComission ? otherComission : 0})`
    }
}