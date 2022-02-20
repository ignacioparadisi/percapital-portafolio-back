import {DAO} from "@Persistence/dao/DAO";
import {IStockHistoricDAO} from "@Persistence/dao/stock_historic/IStockHistoricDAO";
import {StockHistoric} from "@Common/entities/StockHistoric";
import {StockTitle} from "@Common/entities/StockTitle";
import {RequiredFieldError} from "@Common/errors/RequiredFieldError";
import {StockTitleDBFunctions} from "@Persistence/database/functions/StockTitleDBFunctions";
import {Database} from "@Persistence/database/DB";
import {GeneralError} from "@Common/errors/GeneralError";
import {StockHistoricBDFunctions} from "@Persistence/database/functions/StockHistoricBDFunctions";

export class StockHistoricDAO extends DAO<StockHistoric> implements IStockHistoricDAO {
    async createMultiple(entities: StockHistoric[]): Promise<StockHistoric[]> {
        let query = StockHistoricBDFunctions.insertStocks(JSON.stringify({ data: entities }));
        return await Database.shared.execute(query, StockHistoric);
    }

    async create(entity: StockHistoric): Promise<StockHistoric> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async delete(entity: StockHistoric): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where: StockHistoric, limit?: number, skip?: number): Promise<StockHistoric[]> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async update(where: StockHistoric, entity: StockHistoric): Promise<StockHistoric> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}