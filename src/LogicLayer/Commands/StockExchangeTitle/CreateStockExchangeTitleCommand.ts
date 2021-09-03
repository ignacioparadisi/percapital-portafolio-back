import {Command} from "@Logic/Commands/Command";
import {StockExchangeTitle} from "@Common/Entities/StockExchangeTitle";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class CreateStockExchangeTitleCommand extends Command<StockExchangeTitle>{
    constructor(private insertData: StockExchangeTitle) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createStockExchangeTitleDAO();
        return dao.create(this.insertData);
    }
}
