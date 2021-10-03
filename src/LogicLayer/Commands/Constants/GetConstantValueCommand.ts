import { ConstantType } from "@Common/Entities/ConstantType";
import { ConstantValue } from "@Common/Entities/ConstantValue";
import { ConstantValueDAO } from "@Persistence/DAO/ConstantValue/ConstantValueDAO";
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