import {Loader} from "@Logic/Loaders/Loader";
import {IConstantTypeDAO} from "@Persistence/DAO/ConstantType/IConstantTypeDAO";
import {ConstantType} from '@Common/Entities/ConstantType';
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class ConstantTypeLoader extends Loader{
    protected dao: IConstantTypeDAO;
    private constructor() {
        super();
        this.dao = getActiveFactory().createConstantTypeDAO();
    }
    static getInstance(): ConstantTypeLoader {
        this.instance = !this.instance ? new ConstantTypeLoader() : this.instance;
        return this.instance as ConstantTypeLoader;
    }
    load(parent: any, where: ConstantType, limit?: number, skip?: number): Promise<ConstantType | ConstantType[]> {
        return super.load(parent, where, limit, skip);
    }
}
