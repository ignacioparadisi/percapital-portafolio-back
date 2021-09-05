import {Command} from "@Logic/Commands/Command";
import {OperationType} from "@Common/Entities/OperationType";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class DeleteOperationTypeCommand extends Command<number>{
    constructor(private deleteData: OperationType) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createOperationTypeDAO();
        return dao.delete(this.deleteData);
    }
}
