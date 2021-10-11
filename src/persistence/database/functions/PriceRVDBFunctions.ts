export class PriceRVDBFunctions {
    static getPriceRV(id: number): string {
        return `SELECT * FROM get_price_rv(${id})`;
    }

    static getPriceRVByExchangeRate(exchangeRateId: number): string {
        return `SELECT * FROM get_price_rv_by_exchange_rate(${exchangeRateId})`;
    }

    static getPriceRVByTitle(titleId: number): string {
        return `SELECT * FROM get_price_rv_by_title(${titleId})`;
    }
}