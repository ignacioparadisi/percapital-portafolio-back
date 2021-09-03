import {Command} from "@Logic/Commands/Command";
import {Operation} from "@Common/Entities/Operation";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class UpdateOperationCommand extends Command<Operation>{
    constructor(private where: Operation, private updateData: Operation) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createOperationDAO();
        return dao.update(this.where, this.updateData);
    }
}
