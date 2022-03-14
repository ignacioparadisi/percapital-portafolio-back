import { ConstantType } from "@Common/entities/ConstantType";
import { ConstantValue } from "@Common/entities/ConstantValue";
import { ConstantValueDAO } from "@Persistence/dao/constant_value/ConstantValueDAO";
import { Command } from "../Command";

export class GetConstantValueCommand extends Command<ConstantValue, ConstantValue> {

    execute() {
        return new ConstantValueDAO().get(this.params);
    }
}