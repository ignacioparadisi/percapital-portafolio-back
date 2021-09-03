import {Command} from "@Logic/Commands/Command";
import {TypeValue} from "@Common/Entities/TypeValue";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class UpdateTypeValueCommand extends Command<TypeValue>{
    constructor(private where: TypeValue, private updateData: TypeValue) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createTypeValueDAO();
        return dao.update(this.where, this.updateData);
    }
}
