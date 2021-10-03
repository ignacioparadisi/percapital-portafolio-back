import { Operation } from "@Common/entities/Operation";
import { OpertaionsDAO } from "@Persistence/dao/operations/OperationsDAO";
import { Command } from "../Command";

export class GetOperationsCommand extends Command<Operation, Operation[]> {

    private limit?: number;
    private offset?: number;

    constructor(operation: Operation, limit?: number, offset?: number) {
        super(operation);
        this.limit = limit;
        this.offset = offset;
    }

    execute() {
        return new OpertaionsDAO().get(this.params, this.limit, this.offset);
    }
}