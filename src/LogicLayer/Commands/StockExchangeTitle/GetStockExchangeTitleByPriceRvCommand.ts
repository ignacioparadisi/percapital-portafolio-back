import {Command} from '@Logic/Commands/Command';
import {PriceRv} from '@Common/Entities/PriceRv';
import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {StockExchangeTitleLoader} from '@Logic/Loaders/StockExchangeTitleLoader';
export class GetStockExchangeTitleByPriceRvCommand extends Command<StockExchangeTitle>{
    constructor(private where: StockExchangeTitle, private parent: PriceRv) {
        super();
    }
    async execute(): Promise<StockExchangeTitle> {
        const parent = {id: this.parent.prStId};
        const loader = StockExchangeTitleLoader.getInstance();
        return await loader.load(parent, this.where) as StockExchangeTitle;
    }
}
