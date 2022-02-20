import {DAO} from "@Persistence/dao/DAO";
import {IStockHistoricDAO} from "@Persistence/dao/stock_historic/IStockHistoricDAO";
import {StockHistoric} from "@Common/entities/StockHistoric";
import {StockTitle} from "@Common/entities/StockTitle";
import {RequiredFieldError} from "@Common/errors/RequiredFieldError";
import {StockTitleDBFunctions} from "@Persistence/database/functions/StockTitleDBFunctions";
import {Database} from "@Persistence/database/DB";
import {GeneralError} from "@Common/errors/GeneralError";

export class StockHistoricDAO extends DAO<StockHistoric> implements IStockHistoricDAO {
    async createMultiple(entities: StockHistoric[]): Promise<StockHistoric[]> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
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