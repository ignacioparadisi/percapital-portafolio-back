import { StockTitle } from "@Common/entities/StockTitle";
import { Page } from "@Common/utils/Page";
import { IDAO } from "../IDAO";

export interface IStockTitleDAO extends IDAO<StockTitle> {
    getById(where?: StockTitle): Promise<StockTitle[]>;
    getWithStockAmount(userId: number): Promise<StockTitle[]>;
}