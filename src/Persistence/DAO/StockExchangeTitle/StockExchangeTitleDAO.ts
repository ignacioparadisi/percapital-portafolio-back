import { StockExchangeTitle } from "@Common/Entities/StockExchangeTitle";
import { GeneralError } from "@Common/Errors/GeneralError";
import { DAO } from "../DAO";
import { IStockExchangeTitleDAO } from "./IStockExchangeTitleDAO";
import { StockExchangeTitleDBFunctions } from "@Persistence/Database/Functions/StockExchangeTitleDBFunctions";
import { RequiredFieldError } from "@Common/Errors/RequiredFieldError";
import { Database } from "@Persistence/Database/DB";

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