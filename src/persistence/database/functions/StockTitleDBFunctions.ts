export class StockTitleDBFunctions {
    static createTitle(description: string, value: string, isinCode: string): string {
        return `SELECT * FROM create_stock_title('${description}', '${value}', '${isinCode}')`;
    }
    static getTitles(limit?: number, offset?: number, search?: string): string {
        let searchValue = search == undefined ? 'NULL' : `'${search}'`;
        return `SELECT * FROM get_stock_titles(${limit == undefined ? null : limit}, ${offset == undefined ? null : offset}, ${searchValue})`;
    }

    static getTitleById(id: number): string {
        return `SELECT * FROM get_stock_title_by_id(${id})`;
    }

    static getTitleWithStockAmount(userId: number): string {
        return `SELECT * FROM get_stock_title_with_stocks(${userId})`;
    }
}