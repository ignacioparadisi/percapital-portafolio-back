import {Command} from '@Logic/Commands/Command';
import {ConstantType} from '@Common/Entities/ConstantType';
import {TypeValue} from '@Common/Entities/TypeValue';
import {TypeValueLoader} from '@Logic/Loaders/TypeValueLoader';
export class GetTypeValuesByConstantTypeCommand extends Command<TypeValue> {
    constructor(private where: TypeValue, private parent: ConstantType, private limit?: number) {
        super();
    }
    async execute(): Promise<TypeValue[]> {
        const parent = {tvCtId: this.parent.id};
        const loader = TypeValueLoader.getInstance();
        return await loader.load(parent, this.where, this.limit) as TypeValue[];
    }
}
