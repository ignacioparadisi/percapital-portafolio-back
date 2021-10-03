import { StockExchangeTitle } from "@Common/Entities/StockExchangeTitle";
import { StockExchangeTitleDAO } from "@Persistence/DAO/StockExchangeTitle/StockExchangeTitleDAO";
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