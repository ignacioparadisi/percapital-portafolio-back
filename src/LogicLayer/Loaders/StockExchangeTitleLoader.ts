import {Loader} from "@Logic/Loaders/Loader";
import {IStockExchangeTitleDAO} from "@Persistence/DAO/StockExchangeTitle/IStockExchangeTitleDAO";
import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class StockExchangeTitleLoader extends Loader{
    protected dao: IStockExchangeTitleDAO;
    private constructor() {
        super();
        this.dao = getActiveFactory().createStockExchangeTitleDAO();
    }
    static getInstance(): StockExchangeTitleLoader {
        this.instance = !this.instance ? new StockExchangeTitleLoader() : this.instance;
        return this.instance as StockExchangeTitleLoader;
    }
    load(parent: any, where: StockExchangeTitle, limit?: number, skip?: number): Promise<StockExchangeTitle | StockExchangeTitle[]> {
        return super.load(parent, where, limit, skip);
    }
}
