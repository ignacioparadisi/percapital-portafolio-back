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

    constructor(...args) {
        if (args.length === 1 && args[0] instanceof StockHistoric) {
            let entity = args[0];
            this.id = entity.id;
            this.symbol = entity.symbol;
            this.date = entity.date;
            this.closePrice = entity.closePrice;
            this.openPrice = entity.openPrice;
            this.highPrice = entity.highPrice;
            this.lowPrice = entity.lowPrice;
            this.volume = entity.volume;
            this.change = entity.change;
        } else if (args.length === 2) {
            this.symbol = args[0];
            this.closePrice = args[1];
            this.date = new Date();
        }
    }
}

module.exports = {
    StockHistoric
}