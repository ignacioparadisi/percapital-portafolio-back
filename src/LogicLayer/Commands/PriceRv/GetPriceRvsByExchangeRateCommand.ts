import {Command} from '@Logic/Commands/Command';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {PriceRv} from '@Common/Entities/PriceRv';
import {PriceRvLoader} from '@Logic/Loaders/PriceRvLoader';
export class GetPriceRvsByExchangeRateCommand extends Command<PriceRv> {
    constructor(private where: PriceRv, private parent: ExchangeRate, private limit?: number) {
        super();
    }
    async execute(): Promise<PriceRv[]> {
        const parent = {prvExrId: this.parent.id};
        const loader = PriceRvLoader.getInstance();
        return await loader.load(parent, this.where, this.limit) as PriceRv[];
    }
}
