import { StockTitle } from "@Common/entities/StockTitle";
import { CreateStockTitleCommand } from "./CreateStockTitleCommand";
import { GetStockTitlesCommand } from "./GetStockTitlesCommand";

export class StockTitleCommandFactory {
    static createGetStockTitlesCommand(where: StockTitle, limit?: number, skip?: number) {
        return new GetStockTitlesCommand(where, limit, skip);
    }
    static createCreateStockTitleCommand(insertData: StockTitle) {
        return new CreateStockTitleCommand(insertData);
    }
}