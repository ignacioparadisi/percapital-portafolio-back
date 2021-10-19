import { ExchangeRate } from "@Common/entities/ExchangeRate";
import { CreateExchangeRateCommand } from "./CreateExchangeRateCommand";
import { GetExchangeRateByIdCommand } from "./GetExchangeRateByIdCommand";
import { GetExchangeRatesCommand } from "./GetExchangeRatesCommand";
import { GetLatestExchangeRateCommand } from "./GetLatestExchangeRateCommand";

export class ExchangeRateCommandFactory {
    static createGetExchangeRatesCommand(where: ExchangeRate, limit?: number, skip?: number) {
        return new GetExchangeRatesCommand(where, limit, skip);
    }
    static createCreateExchangeRateCommand(insertData: ExchangeRate) {
        return new CreateExchangeRateCommand(insertData);
    }

    static createGetExchangeRateByIdCommand(where: ExchangeRate) {
        return new GetExchangeRateByIdCommand(where);
    }

    static createGetLatestExchangeRateCommand(where: ExchangeRate) {
        return new GetLatestExchangeRateCommand(where);
    }
}