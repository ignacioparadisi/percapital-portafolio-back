import {Loader} from "@Logic/Loaders/Loader";
import {ITypeValueDAO} from "@Persistence/DAO/TypeValue/ITypeValueDAO";
import {TypeValue} from '@Common/Entities/TypeValue';
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class TypeValueLoader extends Loader{
    protected dao: ITypeValueDAO;
    private constructor() {
        super();
        this.dao = getActiveFactory().createTypeValueDAO();
    }
    static getInstance(): TypeValueLoader {
        this.instance = !this.instance ? new TypeValueLoader() : this.instance;
        return this.instance as TypeValueLoader;
    }
    load(parent: any, where: TypeValue, limit?: number, skip?: number): Promise<TypeValue | TypeValue[]> {
        return super.load(parent, where, limit, skip);
    }
}
