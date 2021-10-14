import { OperationType } from "@Common/entities/OperationType";
import { OperationTypeDAO } from "@Persistence/dao/operation_type/OperationTypeDAO";
import { Command } from "../Command";

export class GetOperationTypeCommand extends Command<OperationType, OperationType[]> {

    execute() {
        return new OperationTypeDAO().get(this.params);
    }
}