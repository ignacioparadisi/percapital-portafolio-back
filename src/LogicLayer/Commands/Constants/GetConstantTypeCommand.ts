import { ConstantType } from "@Common/Entities/ConstantType";
import { ConstantTypeDAO } from "@Persistence/DAO/ConstantType/ConstantTypeDAO";
import { Command } from "../Command";

export class GetConstantTypeCommand extends Command<ConstantType, ConstantType> {

    execute() {
        return new ConstantTypeDAO().get(this.params);
    }
}