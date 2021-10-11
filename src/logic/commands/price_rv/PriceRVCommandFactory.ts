import { PriceRV } from "@Common/entities/PriceRV";
import { CreatePriceRVCommand } from "./CreatePriceRVCommand";
import { GetPriceRVByExchangeRateCommand } from "./GetPriceRVByExchangeRateCommand";
import { GetPriceRVByTitleCommand } from "./GetPriceRVByTitleCommand";
import { GetPriceRVCommand } from "./GetPriceRVCommand";

export class PriceRVCommandFactory {
    static createGetPriceRVCommand(where: PriceRV) {
        return new GetPriceRVCommand(where);
    }

    static createGetPriceRVCommandByExchangeRateCommand(where: PriceRV) {
        return new GetPriceRVByExchangeRateCommand(where);
    }

    static createGetPriceRVByTitleCommand(where: PriceRV) {
        return new GetPriceRVByTitleCommand(where);
    }

    static createCreatePriceRVCommand(insertData: PriceRV) {
        return new CreatePriceRVCommand(insertData);
    }
}