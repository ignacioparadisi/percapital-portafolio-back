import { StockTitle } from "@Common/entities/StockTitle";
import { StockTitleDAO } from "@Persistence/dao/stock_title/StockTitleDAO";
import { Command } from "../Command";

export class GetStockTitlesCommand extends Command<StockTitle, StockTitle> {

    private limit?: number;
    private skip?: number;

    constructor(entity: StockTitle, limit?: number, skip?: number) {
        super(entity);
        this.limit = limit;
        this.skip = skip;
    }

    execute() {
        return new StockTitleDAO().get(this.params, this.limit, this.skip);
    }
}