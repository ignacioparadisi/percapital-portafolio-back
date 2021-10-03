export class PriceRVDBFunctions {
    static getPriceRV(id: number): string {
        return `SELECT * FROM get_price_rv(${id})`;
    }
}