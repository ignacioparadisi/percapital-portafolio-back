import { PriceRV } from "@Common/Entities/PriceRV";
import { GetPriceRVCommand } from "./GetPriceRVCommand";

export class PriceRVCommandFactory {
    static createGetPriceRVCommand(where: PriceRV) {
        return new GetPriceRVCommand(where);
    }
}