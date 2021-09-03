import {Command} from "@Logic/Commands/Command";
import {TypeValue} from "@Common/Entities/TypeValue";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class DeleteTypeValueCommand extends Command<number>{
    constructor(private deleteData: TypeValue) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createTypeValueDAO();
        return dao.delete(this.deleteData);
    }
}
