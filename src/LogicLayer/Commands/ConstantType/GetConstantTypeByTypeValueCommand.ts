import {Command} from '@Logic/Commands/Command';
import {TypeValue} from '@Common/Entities/TypeValue';
import {ConstantType} from '@Common/Entities/ConstantType';
import {ConstantTypeLoader} from '@Logic/Loaders/ConstantTypeLoader';
export class GetConstantTypeByTypeValueCommand extends Command<ConstantType>{
    constructor(private where: ConstantType, private parent: TypeValue) {
        super();
    }
    async execute(): Promise<ConstantType> {
        const parent = {id: this.parent.tvaCotId};
        const loader = ConstantTypeLoader.getInstance();
        return await loader.load(parent, this.where) as ConstantType;
    }
}
