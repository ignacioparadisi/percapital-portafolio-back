import { ConstantType } from "@Common/Entities/ConstantType";
import { getDBInstance } from "@Persistence/Database/DB";
import { KnexQueryBuilder } from "@Persistence/Database/KnexQueryBuilder";
import { Command } from "./Command";

export class CreateConstantTypeCommand extends Command<ConstantType, ConstantType> {

    private input: ConstantType;

    constructor(input: ConstantType) {
        super(input);
        this.input = input;
    }

    execute() {
        let db = new KnexQueryBuilder(this.input, getDBInstance());
        return db.create(this.input);
    }
}