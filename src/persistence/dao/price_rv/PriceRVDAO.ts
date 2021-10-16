import { PriceRV } from "@Common/entities/PriceRV";
import { GeneralError } from "@Common/errors/GeneralError";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { PriceRVDBFunctions } from "@Persistence/database/functions/PriceRVDBFunctions";
import { IPriceRVDAO } from "./IPriceRVDAO";

export class PriceRVDAO implements IPriceRVDAO {
    
    async create(entity: PriceRV): Promise<PriceRV> {
        if (!entity.titleId) {
            throw new RequiredFieldError('titleId');
        }
        if (!entity.exchangeRateId) {
            throw new RequiredFieldError('exchangeRateId');
        }
        if (!entity.bolivaresPrice) {
            throw new RequiredFieldError('bolivaresPrice');
        }
        if (!entity.closeDate) {
            throw new RequiredFieldError('closeDate');
        }
        if (!entity.closePrice) {
            throw new RequiredFieldError('closePrice');
        }

        let query = PriceRVDBFunctions.createPriceRV(entity.titleId, entity.exchangeRateId, entity.bolivaresPrice, 
            entity.closeDate, entity.closePrice, entity.createdAt);
        let result = await Database.shared.execute(query, PriceRV);
        if (result.length > 0) {
            return result[0];
        }
        throw new GeneralError('Error creating PriceRV');
    }

    async get(where?: PriceRV, limit?: number, skip?: number ): Promise<PriceRV[]> {
        let query = PriceRVDBFunctions.getPriceRVs(limit, skip);
        let result = await Database.shared.execute(query, PriceRV);
        return result;
    }

    async getById(where?: PriceRV, limit?: number, skip?: number): Promise<PriceRV[]> {
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