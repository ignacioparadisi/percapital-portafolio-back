import { ExchangeRate } from "@Common/entities/ExchangeRate";
import { ExchangeRateDAO } from "@Persistence/dao/exchange_rate/ExchangeRateDAO";
import { Command } from "../Command";

export class GetExchangeRatesCommand extends Command<ExchangeRate, ExchangeRate> {

    private limit?: number;
    private skip?: number;

    constructor(entity: ExchangeRate, limit?: number, skip?: number) {
        super(entity);
        this.limit = limit;
        this.skip = skip;
    }

    execute() {
        return new ExchangeRateDAO().get(this.params, this.limit, this.skip);
    }
}