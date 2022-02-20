import {GetStockFromBVC} from "@Logic/commands/stock_historic/GetStockFromBVC";
import {StockHistoric} from "@Common/entities/StockHistoric";

export class StockHistoricCommandFactory {
    static createGetStockFromBVC() {
        return new GetStockFromBVC(new StockHistoric());
    }
}