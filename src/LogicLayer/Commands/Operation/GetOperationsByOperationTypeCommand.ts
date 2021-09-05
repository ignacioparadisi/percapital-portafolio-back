import {Command} from '@Logic/Commands/Command';
import {OperationType} from '@Common/Entities/OperationType';
import {Operation} from '@Common/Entities/Operation';
import {OperationLoader} from '@Logic/Loaders/OperationLoader';
export class GetOperationsByOperationTypeCommand extends Command<Operation> {
    constructor(private where: Operation, private parent: OperationType, private limit?: number) {
        super();
    }
    async execute(): Promise<Operation[]> {
        const parent = {opeTypeId: this.parent.id};
        const loader = OperationLoader.getInstance();
        return await loader.load(parent, this.where, this.limit) as Operation[];
    }
}
