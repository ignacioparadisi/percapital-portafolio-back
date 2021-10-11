import { PriceRV } from "@Common/entities/PriceRV";
import { GetPriceRVByExchangeRateCommand } from "./GetPriceRVByExchangeRateCommand";
import { GetPriceRVByTitleCommand } from "./GetPriceRVByTitleCommand";
import { GetPriceRVCommand } from "./GetPriceRVCommand";

export class PriceRVCommandFactory {
    static createGetPriceRVCommand(where: PriceRV) {
        return new GetPriceRVCommand(where);
    }

    static createGetPriceRVCommandByExchangeRate(where: PriceRV) {
        return new GetPriceRVByExchangeRateCommand(where);
    }

    static createGetPriceRVByTitle(where: PriceRV) {
        return new GetPriceRVByTitleCommand(where);
    }
}