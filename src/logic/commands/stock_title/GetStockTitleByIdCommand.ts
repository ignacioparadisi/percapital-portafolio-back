import { StockTitle } from "@Common/entities/StockTitle";
import { StockTitleDAO } from "@Persistence/dao/stock_title/StockTitleDAO";
import { Command } from "../Command";

export class GetStockTitleByIdCommand extends Command<StockTitle, StockTitle> {

    execute() {
        return new StockTitleDAO().getById(this.params);
    }
}