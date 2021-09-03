import {Command} from '@Logic/Commands/Command';
import {PriceRv} from '@Common/Entities/PriceRv';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {ExchangeRateLoader} from '@Logic/Loaders/ExchangeRateLoader';
export class GetExchangeRateByPriceRvCommand extends Command<ExchangeRate>{
    constructor(private where: ExchangeRate, private parent: PriceRv) {
        super();
    }
    async execute(): Promise<ExchangeRate> {
        const parent = {id: this.parent.prErId};
        const loader = ExchangeRateLoader.getInstance();
        return await loader.load(parent, this.where) as ExchangeRate;
    }
}
