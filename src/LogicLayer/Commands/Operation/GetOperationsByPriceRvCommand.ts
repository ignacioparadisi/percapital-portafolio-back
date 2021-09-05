import {Command} from '@Logic/Commands/Command';
import {PriceRv} from '@Common/Entities/PriceRv';
import {Operation} from '@Common/Entities/Operation';
import {OperationLoader} from '@Logic/Loaders/OperationLoader';
export class GetOperationsByPriceRvCommand extends Command<Operation> {
    constructor(private where: Operation, private parent: PriceRv, private limit?: number) {
        super();
    }
    async execute(): Promise<Operation[]> {
        const parent = {opePrvId: this.parent.id};
        const loader = OperationLoader.getInstance();
        return await loader.load(parent, this.where, this.limit) as Operation[];
    }
}
