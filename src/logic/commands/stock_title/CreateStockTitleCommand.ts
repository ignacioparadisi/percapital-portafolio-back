import { StockTitle } from "@Common/entities/StockTitle";
import { StockTitleDAO } from "@Persistence/dao/stock_title/StockTitleDAO";
import { Command } from "../Command";

export class CreateStockTitleCommand extends Command<StockTitle, StockTitle> {

    execute() {
        return new StockTitleDAO().create(this.params);
    }
}