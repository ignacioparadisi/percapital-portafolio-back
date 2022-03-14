import { ConstantType } from "@Common/entities/ConstantType";
import { ConstantTypeDAO } from "@Persistence/dao/constant_type/ConstantTypeDAO";
import { Command } from "../Command";

export class GetConstantTypeCommand extends Command<ConstantType, ConstantType> {

    execute() {
        return new ConstantTypeDAO().get(this.params);
    }
}