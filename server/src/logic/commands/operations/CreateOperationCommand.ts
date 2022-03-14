import { Operation } from "@Common/entities/Operation";
import { OperationsDAO } from "@Persistence/dao/operations/OperationsDAO";
import { Command } from "../Command";

export class CreateOperationCommand extends Command<Operation, Operation> {

    execute() {
        return new OperationsDAO().create(this.params);
    }
}