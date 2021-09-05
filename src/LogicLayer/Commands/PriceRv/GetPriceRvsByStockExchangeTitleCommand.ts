import {Command} from '@Logic/Commands/Command';
import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {PriceRv} from '@Common/Entities/PriceRv';
import {PriceRvLoader} from '@Logic/Loaders/PriceRvLoader';
export class GetPriceRvsByStockExchangeTitleCommand extends Command<PriceRv> {
    constructor(private where: PriceRv, private parent: StockExchangeTitle, private limit?: number) {
        super();
    }
    async execute(): Promise<PriceRv[]> {
        const parent = {prvSetId: this.parent.id};
        const loader = PriceRvLoader.getInstance();
        return await loader.load(parent, this.where, this.limit) as PriceRv[];
    }
}
