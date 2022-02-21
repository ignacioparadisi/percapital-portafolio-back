import { StockHistoric } from "@Common/entities/StockHistoric";
import { StockHistoricDAO } from "@Persistence/dao/stock_historic/StockHistoricDAO";
import { Command } from "../Command";

export class GetStockHistoricBySymbolCommand extends Command<StockHistoric, StockHistoric> {

    private symbol: string;
    private interval?: string;

    constructor(entity: StockHistoric, symbol: string, interval?: string) {
        super(entity);
        this.symbol = symbol;
        this.interval = interval;
    }

    execute() {
        return new StockHistoricDAO().getBySymbol(this.symbol, this.interval)
    }
}