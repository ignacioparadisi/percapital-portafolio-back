import {Command} from "@Logic/Commands/Command";
import {ConstantType} from "@Common/Entities/ConstantType";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class DeleteConstantTypeCommand extends Command<number>{
    constructor(private deleteData: ConstantType) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createConstantTypeDAO();
        return dao.delete(this.deleteData);
    }
}
