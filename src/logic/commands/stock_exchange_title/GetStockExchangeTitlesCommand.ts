import { StockExchangeTitle } from "@Common/entities/StockExchangeTitle";
import { StockExchangeTitleDAO } from "@Persistence/dao/stock_exchange_title/StockExchangeTitleDAO";
import { Command } from "../Command";

export class GetStockExchangeTitlesCommand extends Command<StockExchangeTitle, StockExchangeTitle> {

    private limit?: number;
    private skip?: number;

    constructor(entity: StockExchangeTitle, limit?: number, skip?: number) {
        super(entity);
        this.limit = limit;
        this.skip = skip;
    }

    execute() {
        return new StockExchangeTitleDAO().get(this.params, this.limit, this.skip);
    }
}