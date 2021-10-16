import { PriceRV } from "@Common/entities/PriceRV";
import { PriceRVDAO } from "@Persistence/dao/price_rv/PriceRVDAO";
import { Command } from "../Command";

export class GetPriceRVByTitleCommand extends Command<PriceRV, PriceRV> {

    execute() {
        return new PriceRVDAO().getByTitle(this.params);
    }
}