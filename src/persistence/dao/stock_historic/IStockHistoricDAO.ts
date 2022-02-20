import { IDAO } from "../IDAO";
import {StockHistoric} from "@Common/entities/StockHistoric";

export interface IStockHistoricDAO extends IDAO<StockHistoric> {
    createMultiple(entities: StockHistoric[]): Promise<StockHistoric[]>;
}