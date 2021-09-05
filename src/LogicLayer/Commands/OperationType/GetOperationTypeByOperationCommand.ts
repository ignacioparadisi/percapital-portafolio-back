import {Command} from '@Logic/Commands/Command';
import {Operation} from '@Common/Entities/Operation';
import {OperationType} from '@Common/Entities/OperationType';
import {OperationTypeLoader} from '@Logic/Loaders/OperationTypeLoader';
export class GetOperationTypeByOperationCommand extends Command<OperationType>{
    constructor(private where: OperationType, private parent: Operation) {
        super();
    }
    async execute(): Promise<OperationType> {
        const parent = {id: this.parent.opeTypeId};
        const loader = OperationTypeLoader.getInstance();
        return await loader.load(parent, this.where) as OperationType;
    }
}
