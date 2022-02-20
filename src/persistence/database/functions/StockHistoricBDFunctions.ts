export class StockHistoricBDFunctions {
    static insertStocks(data: string): string {
        return `SELECT * FROM create_stock_historic('${data}', 'data', 'symbol',
            'date', 'closePrice', 'openPrice',
            'highPrice', 'lowPrice', 'volume', 'change')`;
    }
}