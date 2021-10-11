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

    static createPriceRV(titleId: number, exchangeRateId: number, bolivaresPrice: number, closeDate: Date, closePrice: number, 
        createdAt?: Date): string {
        return `SELECT * FROM create_price_rv(${titleId}, ${exchangeRateId}, ${bolivaresPrice}, ${createdAt ? `'${createdAt}'` : null}, '${closeDate}', ${closePrice})`;
    }
}