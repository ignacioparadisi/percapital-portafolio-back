import { StockExchangeTitle } from "@Common/Entities/StockExchangeTitle";
import { GetStockExchangeTitlesCommand } from "./GetStockExchangeTitlesCommand";

export class StockExchangeTitleCommandFactory {
    static createGetStockExchangeTitlesCommand(where: StockExchangeTitle, limit?: number, skip?: number) {
        return new GetStockExchangeTitlesCommand(where, limit, skip);
    }
}