import {Command} from "@Logic/Commands/Command";
import {OperationType} from "@Common/Entities/OperationType";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class GetOperationTypesCommand extends Command<OperationType>{
    constructor(private where: OperationType, private skip?: number, private limit?: number) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createOperationTypeDAO();
        return dao.get(this.where, this.skip, this.limit);
    }
}
