import {Command} from "@Logic/Commands/Command";
import {OperationType} from "@Common/Entities/OperationType";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class CreateOperationTypeCommand extends Command<OperationType>{
    constructor(private insertData: OperationType) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createOperationTypeDAO();
        return dao.create(this.insertData);
    }
}
