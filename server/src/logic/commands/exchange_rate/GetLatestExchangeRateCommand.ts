import { ExchangeRate } from "@Common/entities/ExchangeRate";
import { ExchangeRateDAO } from "@Persistence/dao/exchange_rate/ExchangeRateDAO";
import { Command } from "../Command";

export class GetLatestExchangeRateCommand extends Command<ExchangeRate, ExchangeRate> {

    execute() {
        return new ExchangeRateDAO().getLatestExchangeRate();
    }
}