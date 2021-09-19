import { ConstantType } from "@Common/Entities/ConstantType";
import { ConstantTypeDAO } from "@Persistence/DAO/ConstantType/ConstantTypeDAO";
import { Command } from "./Command";

export class GetConstantTypeCommand extends Command<ConstantType, ConstantType> {

    private constantType: ConstantType;

    constructor(constantType: ConstantType) {
        super(constantType);
        this.constantType = constantType;
    }

    execute() {
        return new ConstantTypeDAO().get(this.constantType);
    }
}