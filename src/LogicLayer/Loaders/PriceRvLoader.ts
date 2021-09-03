import {Loader} from "@Logic/Loaders/Loader";
import {IPriceRvDAO} from "@Persistence/DAO/PriceRv/IPriceRvDAO";
import {PriceRv} from '@Common/Entities/PriceRv';
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class PriceRvLoader extends Loader{
    protected dao: IPriceRvDAO;
    private constructor() {
        super();
        this.dao = getActiveFactory().createPriceRvDAO();
    }
    static getInstance(): PriceRvLoader {
        this.instance = !this.instance ? new PriceRvLoader() : this.instance;
        return this.instance as PriceRvLoader;
    }
    load(parent: any, where: PriceRv, limit?: number, skip?: number): Promise<PriceRv | PriceRv[]> {
        return super.load(parent, where, limit, skip);
    }
}
