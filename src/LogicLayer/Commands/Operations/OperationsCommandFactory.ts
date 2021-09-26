import { Operation } from "@Common/Entities/Operation";
import { GetOperationsCommand } from "./GetOperationsCommand";

export class OperationsCommandFactory {
    static createGetOperationsCommand(operation: Operation, limit?: number, offset?: number) {
        return new GetOperationsCommand(operation, limit, offset);
    }
}