import {GetStockFromBVC} from "@Logic/commands/stock_historic/GetStockFromBVC";
import {StockHistoric} from "@Common/entities/StockHistoric";
import { GetStockHistoricBySymbolCommand } from "@Logic/commands/stock_historic/GetStockHistoricBySymbol";

export class StockHistoricCommandFactory {
    static createGetStockFromBVC() {
        return new GetStockFromBVC(new StockHistoric());
    }
 
    static createGetStockHistoricBySymbol(symbol: string, interval?: string) {
        return new GetStockHistoricBySymbolCommand(new StockHistoric(), symbol, interval);
    }
}