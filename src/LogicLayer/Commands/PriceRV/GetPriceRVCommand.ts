import { PriceRV } from "@Common/Entities/PriceRV";
import { PriceRVDAO } from "@Persistence/DAO/PriceRV/PriceRVDAO";
import { Command } from "../Command";

export class GetPriceRVCommand extends Command<PriceRV, PriceRV> {

    execute() {
        return new PriceRVDAO().get(this.params);
    }
}