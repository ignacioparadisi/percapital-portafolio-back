import {Loader} from "@Logic/Loaders/Loader";
import {IExchangeRateDAO} from "@Persistence/DAO/ExchangeRate/IExchangeRateDAO";
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class ExchangeRateLoader extends Loader{
    protected dao: IExchangeRateDAO;
    private constructor() {
        super();
        this.dao = getActiveFactory().createExchangeRateDAO();
    }
    static getInstance(): ExchangeRateLoader {
        this.instance = !this.instance ? new ExchangeRateLoader() : this.instance;
        return this.instance as ExchangeRateLoader;
    }
    load(parent: any, where: ExchangeRate, limit?: number, skip?: number): Promise<ExchangeRate | ExchangeRate[]> {
        return super.load(parent, where, limit, skip);
    }
}
