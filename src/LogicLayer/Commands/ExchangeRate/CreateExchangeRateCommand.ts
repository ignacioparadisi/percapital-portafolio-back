import {Command} from "@Logic/Commands/Command";
import {ExchangeRate} from "@Common/Entities/ExchangeRate";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class CreateExchangeRateCommand extends Command<ExchangeRate>{
    constructor(private insertData: ExchangeRate) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createExchangeRateDAO();
        return dao.create(this.insertData);
    }
}
