import { PriceRV } from "@Common/entities/PriceRV";
import { PriceRVDAO } from "@Persistence/dao/price_rv/PriceRVDAO";
import { Command } from "../Command";

export class CreatePriceRVCommand extends Command<PriceRV, PriceRV> {

    execute() {
        return new PriceRVDAO().create(this.params);
    }
}