import { GeneralError } from "@Common/errors/GeneralError";
import { DAO } from "../DAO";
import { ExchangeRateDBFunctions } from "@Persistence/database/functions/ExchangeRateDBFunctions";
import { RequiredFieldError } from "@Common/errors/RequiredFieldError";
import { Database } from "@Persistence/database/DB";
import { ExchangeRate } from "@Common/entities/ExchangeRate";
import { IExchangeRateDAO } from "./IExchangeRateDAO";

export class ExchangeRateDAO extends DAO<ExchangeRate> implements IExchangeRateDAO {
    async create(entity: ExchangeRate): Promise<ExchangeRate> {
        if (!entity.value) {
            throw new RequiredFieldError('value');
        }
        let query = ExchangeRateDBFunctions.createExchangeRate(entity.value);
        let result = await Database.shared.execute(query, ExchangeRate);
        if (result.length > 0) {
            return result[0];
        }
        throw new GeneralError('Error creating Exchange Rate');
    }

    async delete(entity: ExchangeRate): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    async get(where: ExchangeRate, limit?: number, skip?: number): Promise<ExchangeRate[]> {
        let query = ExchangeRateDBFunctions.getExchangeRate(limit, skip);
        let result = await Database.shared.execute(query, ExchangeRate);
        return result;
    }

    async update(where: ExchangeRate, entity: ExchangeRate): Promise<ExchangeRate> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}