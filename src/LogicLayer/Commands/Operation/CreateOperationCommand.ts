import {Command} from "@Logic/Commands/Command";
import {Operation} from "@Common/Entities/Operation";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class CreateOperationCommand extends Command<Operation>{
    constructor(private insertData: Operation) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createOperationDAO();
        return dao.create(this.insertData);
    }
}
