import { Operation } from "@Common/Entities/Operation";
import { OpertaionsDAO } from "@Persistence/DAO/Operations/OperationsDAO";
import { Command } from "../Command";

export class GetOperationsCommand extends Command<Operation, Operation[]> {

    private operation: Operation;
    private limit?: number;
    private offset?: number;

    constructor(operation: Operation, limit?: number, offset?: number) {
        super(operation);
        this.operation = operation;
        this.limit = limit;
        this.offset = offset;
    }

    execute() {
        return new OpertaionsDAO().get(this.operation, this.limit, this.offset);
    }
}