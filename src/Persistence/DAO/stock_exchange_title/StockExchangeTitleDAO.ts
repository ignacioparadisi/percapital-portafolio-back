import { StockExchangeTitle } from "@Common/entities/StockExchangeTitle";
import { GeneralError } from "@Common/errors/GeneralError";
import { DAO } from "../DAO";
import { IStockExchangeTitleDAO } from "./IStockExchangeTitleDAO";
import { StockExchangeTitleDBFunctions } from "@Persistence/database/functions/StockExchangeTitleDBFunctions";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";

export class StockExchangeTitleDAO extends DAO<StockExchangeTitle> implements IStockExchangeTitleDAO {
    async create(entity: StockExchangeTitle): Promise<StockExchangeTitle> {
        if (!entity.description) {
            throw new RequiredFieldError('description');
        }
        if (!entity.value) {
            throw new RequiredFieldError('value');
        }
        let query = StockExchangeTitleDBFunctions.createTitle(entity.description, entity.value);
        let result = await Database.shared.execute(query, StockExchangeTitle);
        if (result.length > 0) {
            return result[0];
        }
        throw new GeneralError('Error creating Title');
    }

    async delete(entity: StockExchangeTitle): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where: StockExchangeTitle, limit?: number, skip?: number): Promise<StockExchangeTitle[]> {
        let query = StockExchangeTitleDBFunctions.getTitles(limit, skip);
        let result = await Database.shared.execute(query, StockExchangeTitle);
        return result;
    }

    async update(where: StockExchangeTitle, entity: StockExchangeTitle): Promise<StockExchangeTitle> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}