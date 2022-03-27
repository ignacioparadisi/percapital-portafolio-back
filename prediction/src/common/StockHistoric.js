class StockHistoric {
    id;
    symbol;
    date;
    closePrice;
    openPrice;
    highPrice;
    lowPrice;
    volume;
    change;

    constructor(entity) {
        this.id = entity.id;
        this.symbol = entity.symbol;
        this.date = entity.date;
        this.closePrice = entity.closePrice;
        this.openPrice = entity.openPrice;
        this.highPrice = entity.highPrice;
        this.lowPrice = entity.lowPrice;
        this.volume = entity.volume;
        this.change = entity.change;
    }
}

module.exports = {
    StockHistoric
}