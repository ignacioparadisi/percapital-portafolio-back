import { PriceRV } from "@Common/entities/PriceRV";
import { PriceRVDAO } from "@Persistence/dao/price_rv/PriceRVDAO";
import { Command } from "../Command";

export class GetPriceRVCommand extends Command<PriceRV, PriceRV> {

    execute() {
        return new PriceRVDAO().getById(this.params);
    }
}