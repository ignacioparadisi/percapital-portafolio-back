import {Command} from "@Logic/Commands/Command";
import {StockExchangeTitle} from "@Common/Entities/StockExchangeTitle";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class GetStockExchangeTitlesCommand extends Command<StockExchangeTitle>{
    constructor(private where: StockExchangeTitle, private skip?: number, private limit?: number) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createStockExchangeTitleDAO();
        return dao.get(this.where, this.skip, this.limit);
    }
}
