import {Command} from "@Logic/Commands/Command";
import {ExchangeRate} from "@Common/Entities/ExchangeRate";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class GetExchangeRatesCommand extends Command<ExchangeRate>{
    constructor(private where: ExchangeRate, private skip?: number, private limit?: number) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createExchangeRateDAO();
        return dao.get(this.where, this.skip, this.limit);
    }
}
