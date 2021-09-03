import {Command} from "@Logic/Commands/Command";
import {ExchangeRate} from "@Common/Entities/ExchangeRate";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class UpdateExchangeRateCommand extends Command<ExchangeRate>{
    constructor(private where: ExchangeRate, private updateData: ExchangeRate) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createExchangeRateDAO();
        return dao.update(this.where, this.updateData);
    }
}
