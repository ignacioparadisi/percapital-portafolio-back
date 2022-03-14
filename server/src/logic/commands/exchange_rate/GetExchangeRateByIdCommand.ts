import { ExchangeRate } from "@Common/entities/ExchangeRate";
import { ExchangeRateDAO } from "@Persistence/dao/exchange_rate/ExchangeRateDAO";
import { Command } from "../Command";

export class GetExchangeRateByIdCommand extends Command<ExchangeRate, ExchangeRate> {

    execute() {
        return new ExchangeRateDAO().getById(this.params);
    }
}