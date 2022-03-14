export class ExchangeRateDBFunctions {
    static createExchangeRate(value: number): string {
        return `SELECT * FROM create_exchange_rate(${value})`;
    }

    static getExchangeRate(limit?: number, offset?: number): string {
        return `SELECT * FROM get_exchange_rates(${limit == undefined ? null : limit}, ${offset == undefined ? null : offset})`;
    }

    static getExchangeRateById(id: number): string {
        return `SELECT * FROM get_exchange_rate_by_id(${id})`;
    }

    static getLatestExchangeRate(): string {
        return `SELECT * FROM get_latest_exchange_rate()`;
    }
}