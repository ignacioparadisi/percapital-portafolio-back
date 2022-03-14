export class StockHistoricBDFunctions {
    static insertStocks(data: string): string {
        return `SELECT * FROM create_stock_historic('${data}', 'data', 'symbol',
            'date', 'closePrice', 'openPrice',
            'highPrice', 'lowPrice', 'volume', 'change')`;
    }

    static getBySymbol(symbol: string, interval?: string): string {
        return `SELECT * FROM get_stock_historic_by_symbol('${symbol}', ${ interval ? `'${interval}'` : null })`;
    }
}