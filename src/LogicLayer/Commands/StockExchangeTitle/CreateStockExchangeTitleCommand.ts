import { StockExchangeTitle } from "@Common/Entities/StockExchangeTitle";
import { StockExchangeTitleDAO } from "@Persistence/DAO/StockExchangeTitle/StockExchangeTitleDAO";
import { Command } from "../Command";

export class CreateStockExchangeTitleCommand extends Command<StockExchangeTitle, StockExchangeTitle> {

    execute() {
        return new StockExchangeTitleDAO().create(this.params);
    }
}