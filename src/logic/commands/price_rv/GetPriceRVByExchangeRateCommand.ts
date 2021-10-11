import { PriceRV } from "@Common/entities/PriceRV";
import { PriceRVDAO } from "@Persistence/dao/price_rv/PriceRVDAO";
import { Command } from "../Command";

export class GetPriceRVByExchangeRateCommand extends Command<PriceRV, PriceRV> {

    execute() {
        return new PriceRVDAO().getByExchangeRate(this.params);
    }
}
