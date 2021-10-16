import { StockTitle } from "@Common/entities/StockTitle";
import { GeneralError } from "@Common/errors/GeneralError";
import { DAO } from "../DAO";
import { IStockTitleDAO } from "./IStockTitleDAO";
import { StockTitleDBFunctions } from "@Persistence/database/functions/StockTitleDBFunctions";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";

export class StockTitleDAO extends DAO<StockTitle> implements IStockTitleDAO {
    async create(entity: StockTitle): Promise<StockTitle> {
        if (!entity.name) {
            throw new RequiredFieldError('description');
        }
        if (!entity.symbol) {
            throw new RequiredFieldError('value');
        }
        let query = StockTitleDBFunctions.createTitle(entity.name, entity.symbol);
        let result = await Database.shared.execute(query, StockTitle);
        if (result.length > 0) {
            return result[0];
        }
        throw new GeneralError('Error creating Title');
    }

    async delete(entity: StockTitle): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where: StockTitle, limit?: number, skip?: number): Promise<StockTitle[]> {
        let query = StockTitleDBFunctions.getTitles(limit, skip, where.name);
        let result = await Database.shared.execute(query, StockTitle);
        return result;
    }

    async getById(where: StockTitle): Promise<StockTitle[]> {
        if (!where.id) {
            throw new RequiredFieldError('id');
        }
        let query = StockTitleDBFunctions.getTitleById(where.id);
        let result = await Database.shared.execute(query, StockTitle);
        return result;
    }

    async update(where: StockTitle, entity: StockTitle): Promise<StockTitle> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}