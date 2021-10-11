import { PriceRV } from "@Common/entities/PriceRV";
import { IDAO } from "../IDAO";

export interface IPriceRVDAO extends IDAO<PriceRV> {
    
    getByExchangeRate(
        where?: PriceRV,
        limit?: number,
        skip?: number
    ): Promise<PriceRV[]>;
    
    getByTitle(
        where?: PriceRV,
        limit?: number,
        skip?: number
    ): Promise<PriceRV[]>;

    getById(
        where?: PriceRV,
        limit?: number,
        skip?: number
    ): Promise<PriceRV[]>;
}