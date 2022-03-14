import { OperationType } from "@Common/entities/OperationType";
import { OperationTypeDAO } from "@Persistence/dao/operation_type/OperationTypeDAO";
import { Command } from "../Command";

export class GetOperationTypeForOperationCommand extends Command<OperationType, OperationType[]> {

    execute() {
        return new OperationTypeDAO().getForOperation(this.params);
    }
}