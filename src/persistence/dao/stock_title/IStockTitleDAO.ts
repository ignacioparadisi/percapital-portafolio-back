import { StockTitle } from "@Common/entities/StockTitle";
import { IDAO } from "../IDAO";

export interface IStockTitleDAO extends IDAO<StockTitle> {

    getById(where?: StockTitle): Promise<StockTitle[]>;
}