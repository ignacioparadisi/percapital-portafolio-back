import { ConstantValue } from "@Common/entities/ConstantValue";
import { ConstantValueDAO } from "@Persistence/dao/constant_value/ConstantValueDAO";
import { Command } from "../Command";

export class CreateConstantValueCommand extends Command<ConstantValue, ConstantValue> {

    execute() {
        return new ConstantValueDAO().create(this.params);
    }
}