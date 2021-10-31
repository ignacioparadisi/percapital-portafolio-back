import { StockTitle } from "@Common/entities/StockTitle";
import { CreateStockTitleCommand } from "./CreateStockTitleCommand";
import { GetStockTitleByIdCommand } from "./GetStockTitleByIdCommand";
import { GetStockTitlesCommand } from "./GetStockTitlesCommand";
import { GetStockTitlesWithAmountCommand } from "./GetStockTitlesWithAmountCommand";

export class StockTitleCommandFactory {
    static createGetStockTitlesCommand(where: StockTitle, limit?: number, skip?: number) {
        return new GetStockTitlesCommand(where, limit, skip);
    }
    static createCreateStockTitleCommand(insertData: StockTitle) {
        return new CreateStockTitleCommand(insertData);
    }

    static createGetStockTitleByIdCommand(where: StockTitle) {
        return new GetStockTitleByIdCommand(where);
    }
    static createGetStockTitlesWithAmountCommand(userId: number) {
        return new GetStockTitlesWithAmountCommand(userId);
    }
}