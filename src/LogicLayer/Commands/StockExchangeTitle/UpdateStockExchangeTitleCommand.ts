import {Command} from "@Logic/Commands/Command";
import {StockExchangeTitle} from "@Common/Entities/StockExchangeTitle";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class UpdateStockExchangeTitleCommand extends Command<StockExchangeTitle>{
    constructor(private where: StockExchangeTitle, private updateData: StockExchangeTitle) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createStockExchangeTitleDAO();
        return dao.update(this.where, this.updateData);
    }
}
