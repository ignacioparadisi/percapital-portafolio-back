import { ConstantType } from "@Common/entities/ConstantType";
import { ConstantValue } from "@Common/entities/ConstantValue";
import { CreateConstantValueCommand } from "./CreateConstantValueCommand";
import { GetConstantTypeCommand } from "./GetConstantTypeCommand";
import { GetConstantValueCommand } from "./GetConstantValueCommand";

export class ConstantCommandFactory {
    static createCreateConstantValueCommand(insertData: ConstantValue) {
        return new CreateConstantValueCommand(insertData);
    }

    static createGetConstantTypeCommand(where: ConstantType, limit?: number, skip?: number) {
        return new GetConstantTypeCommand(where);
    }
    
    static createGetConstantValueCommand(where: ConstantType, limit?: number, skip?: number) {
        return new GetConstantValueCommand(where);
    } 
}