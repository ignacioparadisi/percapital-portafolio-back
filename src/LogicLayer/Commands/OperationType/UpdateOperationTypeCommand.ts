import {Command} from "@Logic/Commands/Command";
import {OperationType} from "@Common/Entities/OperationType";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class UpdateOperationTypeCommand extends Command<OperationType>{
    constructor(private where: OperationType, private updateData: OperationType) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createOperationTypeDAO();
        return dao.update(this.where, this.updateData);
    }
}
