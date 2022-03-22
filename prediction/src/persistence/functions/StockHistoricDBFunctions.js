class StockHistoricBDFunctions {
    static insertStocks(data) {
        return `SELECT * FROM create_stock_historic('${data}', 'data', 'symbol',
            'date', 'closePrice', 'openPrice',
            'highPrice', 'lowPrice', 'volume', 'change')`;
    }

    static getBySymbol(symbol, interval) {
        return `SELECT * FROM get_stock_historic_by_symbol('${symbol}', ${ interval ? `'${interval}'` : null })`;
    }
}

module.exports = {
    StockHistoricBDFunctions
}