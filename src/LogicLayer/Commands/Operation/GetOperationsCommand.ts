import {Command} from "@Logic/Commands/Command";
import {Operation} from "@Common/Entities/Operation";
import {getActiveFactory} from '@Persistence/DAO/Factories/getActiveFactory';
export class GetOperationsCommand extends Command<Operation>{
    constructor(private where: Operation, private skip?: number, private limit?: number) {
        super();
    }
    async execute() {
        const dao = getActiveFactory().createOperationDAO();
        return dao.get(this.where, this.skip, this.limit);
    }
}
