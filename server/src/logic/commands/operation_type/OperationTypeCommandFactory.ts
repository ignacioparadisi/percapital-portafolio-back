import { OperationType } from "@Common/entities/OperationType";
import { GetOperationTypeCommand } from "./GetOperationTypeCommand";
import { GetOperationTypeForOperationCommand } from "./GetOperationTypeForOperation";

export class OperationTypeCommandFactory {
    static createGetOperationTypeCommand(operationType: OperationType) {
        return new GetOperationTypeCommand(operationType);
    }

    static createGetOperationTypeForOperationCommand (operationType: OperationType) {
        return new GetOperationTypeForOperationCommand(operationType);
    }
}