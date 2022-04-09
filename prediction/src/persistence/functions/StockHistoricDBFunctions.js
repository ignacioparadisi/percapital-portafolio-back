class StockHistoricBDFunctions {
    static insertStocks(data) {
        return `SELECT * FROM create_stock_historic('${data}', 'data', 'symbol',
            'date', 'closePrice', 'openPrice',
            'highPrice', 'lowPrice', 'volume', 'change')`;
    }

    static getBySymbol(symbol, interval) {
        return `SELECT * FROM get_stock_historic_by_symbol('${symbol}', ${ interval ? `'${interval}'` : null })`;
    }

    static getTodayStocks() {
        return `SELECT * FROM get_today_stocks()`;
    }

    static syncTitlesAndStocks() {
        return `CALL sync_historic_and_title_stocks()`;
    }
}

module.exports = {
    StockHistoricBDFunctions
}