import { PriceRV } from "@Common/Entities/PriceRV";
import { GeneralError } from "@Common/Errors/GeneralError";
import { RequiredFieldError } from "@Common/Errors/RequiredFieldError";
import { Database } from "@Persistence/Database/DB";
import { PriceRVDBFunctions } from "@Persistence/Database/Functions/PriceRVDBFunctions";
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

    update(where: PriceRV, entity: PriceRV): Promise<PriceRV> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    delete(entity: PriceRV): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}