import {Command} from '@Logic/Commands/Command';
import {Operation} from '@Common/Entities/Operation';
import {PriceRv} from '@Common/Entities/PriceRv';
import {PriceRvLoader} from '@Logic/Loaders/PriceRvLoader';
export class GetPriceRvByOperationCommand extends Command<PriceRv>{
    constructor(private where: PriceRv, private parent: Operation) {
        super();
    }
    async execute(): Promise<PriceRv> {
        const parent = {id: this.parent.opePrvId};
        const loader = PriceRvLoader.getInstance();
        return await loader.load(parent, this.where) as PriceRv;
    }
}
