import {Command} from "@Logic/Commands/Command";
import {StockExchangeTitle} from "@Common/Entities/StockExchangeTitle";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class DeleteStockExchangeTitleCommand extends Command<number>{
    constructor(private deleteData: StockExchangeTitle) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createStockExchangeTitleDAO();
        return dao.delete(this.deleteData);
    }
}
