import {Loader} from "@Logic/Loaders/Loader";
import {IOperationDAO} from "@Persistence/DAO/Operation/IOperationDAO";
import {Operation} from '@Common/Entities/Operation';
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class OperationLoader extends Loader{
    protected dao: IOperationDAO;
    private constructor() {
        super();
        this.dao = getActiveFactory().createOperationDAO();
    }
    static getInstance(): OperationLoader {
        this.instance = !this.instance ? new OperationLoader() : this.instance;
        return this.instance as OperationLoader;
    }
    load(parent: any, where: Operation, limit?: number, skip?: number): Promise<Operation | Operation[]> {
        return super.load(parent, where, limit, skip);
    }
}
