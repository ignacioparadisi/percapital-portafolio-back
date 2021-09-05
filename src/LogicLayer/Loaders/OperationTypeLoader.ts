import {Loader} from "@Logic/Loaders/Loader";
import {IOperationTypeDAO} from "@Persistence/DAO/OperationType/IOperationTypeDAO";
import {OperationType} from '@Common/Entities/OperationType';
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class OperationTypeLoader extends Loader{
    protected dao: IOperationTypeDAO;
    private constructor() {
        super();
        this.dao = getActiveFactory().createOperationTypeDAO();
    }
    static getInstance(): OperationTypeLoader {
        this.instance = !this.instance ? new OperationTypeLoader() : this.instance;
        return this.instance as OperationTypeLoader;
    }
    load(parent: any, where: OperationType, limit?: number, skip?: number): Promise<OperationType | OperationType[]> {
        return super.load(parent, where, limit, skip);
    }
}
