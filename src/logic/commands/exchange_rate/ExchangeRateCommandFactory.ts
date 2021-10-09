import { ExchangeRate } from "@Common/entities/ExchangeRate";
import { CreateExchangeRateCommand } from "./CreateExchangeRateCommand";
import { GetExchangeRatesCommand } from "./GetExchangeRatesCommand";

export class ExchangeRateCommandFactory {
    static createGetExchangeRatesCommand(where: ExchangeRate, limit?: number, skip?: number) {
        return new GetExchangeRatesCommand(where, limit, skip);
    }
    static createCreateExchangeRateCommand(insertData: ExchangeRate) {
        return new CreateExchangeRateCommand(insertData);
    }
}