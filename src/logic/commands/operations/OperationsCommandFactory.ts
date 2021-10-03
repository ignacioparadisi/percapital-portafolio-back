import { Operation } from "@Common/entities/Operation";
import { GetOperationsCommand } from "./GetOperationsCommand";

export class OperationsCommandFactory {
    static createGetOperationsCommand(operation: Operation, limit?: number, offset?: number) {
        return new GetOperationsCommand(operation, limit, offset);
    }
}