import {Command} from "@Logic/Commands/Command";
import {ConstantType} from "@Common/Entities/ConstantType";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class UpdateConstantTypeCommand extends Command<ConstantType>{
    constructor(private where: ConstantType, private updateData: ConstantType) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createConstantTypeDAO();
        return dao.update(this.where, this.updateData);
    }
}
