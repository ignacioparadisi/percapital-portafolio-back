import {Command} from "@Logic/Commands/Command";
import {ConstantType} from "@Common/Entities/ConstantType";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class CreateConstantTypeCommand extends Command<ConstantType>{
    constructor(private insertData: ConstantType) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createConstantTypeDAO();
        return dao.create(this.insertData);
    }
}
