import { PriceRV } from "@Common/entities/PriceRV";
import { PriceRVDAO } from "@Persistence/dao/price_rv/PriceRVDAO";
import { Command } from "../Command";

export class GetPriceRVsCommand extends Command<PriceRV, PriceRV> {

    private limit?: number;
    private skip?: number;

    constructor(entity: PriceRV, limit?: number, skip?: number) {
        super(entity);
        this.limit = limit;
        this.skip = skip;
    }

    execute() {
        return new PriceRVDAO().get(this.params, this.limit, this.skip);
    }
}