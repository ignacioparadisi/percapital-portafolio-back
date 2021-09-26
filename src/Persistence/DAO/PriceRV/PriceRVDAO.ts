import { PriceRV } from "@Common/Entities/PriceRV";
import { GeneralError } from "@Common/Errors/GeneralError";
import { IPriceRVDAO } from "./IPriceRVDAO";

export class PriceRVDAO implements IPriceRVDAO {
    create(entity: PriceRV): Promise<PriceRV> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    get(where?: PriceRV, limit?: number, skip?: number ): Promise<PriceRV[]> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    update(where: PriceRV, entity: PriceRV): Promise<PriceRV> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }

    delete(entity: PriceRV): Promise<number> {
        throw GeneralError.METHOD_NOT_IMPLEMENTED;
    }
}