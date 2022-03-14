import { StockTitle } from "@Common/entities/StockTitle";
import { StockTitleDAO } from "@Persistence/dao/stock_title/StockTitleDAO";
import { Command } from "../Command";

export class GetStockTitlesWithAmountCommand extends Command<number, StockTitle> {

    execute() {
        return new StockTitleDAO().getWithStockAmount(this.params);
    }
}