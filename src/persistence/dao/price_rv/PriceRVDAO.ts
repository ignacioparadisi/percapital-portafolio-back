import { PriceRV } from "@Common/entities/PriceRV";
import { GeneralError } from "@Common/errors/GeneralError";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { PriceRVDBFunctions } from "@Persistence/database/functions/PriceRVDBFunctions";
import { IPriceRVDAO } from "./IPriceRVDAO";

export class PriceRVDAO implements IPriceRVDAO {

    create(entity: PriceRV): Promise<PriceRV> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where?: PriceRV, limit?: number, skip?: number ): Promise<PriceRV[]> {
        if (!where?.id) {
            throw new RequiredFieldError('id');
        }
        let query = PriceRVDBFunctions.getPriceRV(where.id);
        let result = await Database.shared.execute(query, PriceRV);
        return result;
    }

    async getByExchangeRate(where?: PriceRV, limit?: number, skip?: number): Promise<PriceRV[]> {
        if (!where?.exchangeRateId) {
            throw new RequiredFieldError('exchangeRateId');
        }
        let query = PriceRVDBFunctions.getPriceRVByExchangeRate(where.exchangeRateId);
        let result = await Database.shared.execute(query, PriceRV);
        return result;
    }

    async getByTitle(where?: PriceRV, limit?: number, skip?: number): Promise<PriceRV[]> {
        if (!where?.titleId) {
            throw new RequiredFieldError('titleId');
        }
        let query = PriceRVDBFunctions.getPriceRVByTitle(where.titleId);
        let result = await Database.shared.execute(query, PriceRV);
        return result;
    }

    update(where: PriceRV, entity: PriceRV): Promise<PriceRV> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    delete(entity: PriceRV): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}