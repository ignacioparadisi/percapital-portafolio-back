import { StockExchangeTitle } from "@Common/entities/StockExchangeTitle";
import { StockExchangeTitleDAO } from "@Persistence/dao/stock_exchange_title/StockExchangeTitleDAO";
import { Command } from "../Command";

export class CreateStockExchangeTitleCommand extends Command<StockExchangeTitle, StockExchangeTitle> {

    execute() {
        return new StockExchangeTitleDAO().create(this.params);
    }
}