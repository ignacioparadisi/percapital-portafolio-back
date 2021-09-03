import {Command} from "@Logic/Commands/Command";
import {ExchangeRate} from "@Common/Entities/ExchangeRate";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class DeleteExchangeRateCommand extends Command<number>{
    constructor(private deleteData: ExchangeRate) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createExchangeRateDAO();
        return dao.delete(this.deleteData);
    }
}
