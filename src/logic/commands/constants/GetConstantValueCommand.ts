import { ConstantType } from "@Common/entities/ConstantType";
import { ConstantValue } from "@Common/entities/ConstantValue";
import { ConstantValueDAO } from "@Persistence/dao/constant_value/ConstantValueDAO";
import { Command } from "../Command";

export class GetConstantValueCommand extends Command<ConstantType, ConstantValue> {

    private input: ConstantType;

    constructor(input: ConstantType) {
        super(input);
        this.input = input;
    }

    execute() {
        let constantValue = new ConstantValue();
        constantValue.constantTypeId = this.input.id;
        return new ConstantValueDAO().get(constantValue);
    }
}