import {Command} from "@Logic/Commands/Command";
import {Operation} from "@Common/Entities/Operation";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class DeleteOperationCommand extends Command<number>{
    constructor(private deleteData: Operation) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createOperationDAO();
        return dao.delete(this.deleteData);
    }
}
