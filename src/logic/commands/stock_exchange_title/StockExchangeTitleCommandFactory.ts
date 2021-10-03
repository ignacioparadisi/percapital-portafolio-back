import { StockExchangeTitle } from "@Common/entities/StockExchangeTitle";
import { CreateStockExchangeTitleCommand } from "./CreateStockExchangeTitleCommand";
import { GetStockExchangeTitlesCommand } from "./GetStockExchangeTitlesCommand";

export class StockExchangeTitleCommandFactory {
    static createGetStockExchangeTitlesCommand(where: StockExchangeTitle, limit?: number, skip?: number) {
        return new GetStockExchangeTitlesCommand(where, limit, skip);
    }
    static createCreateStockExchangeTitleCommand(insertData: StockExchangeTitle) {
        return new CreateStockExchangeTitleCommand(insertData);
    }
}