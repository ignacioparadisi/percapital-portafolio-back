import { ConstantType } from "@Common/entities/ConstantType";
import { ConstantValue } from "@Common/entities/ConstantValue";
import { GetConstantTypeCommand } from "./constants/GetConstantTypeCommand";
import { GetConstantValueCommand } from "./constants/GetConstantValueCommand";


export class CommandFactory {
    private constructor() {}
    static createGetConstantTypesCommand(where: ConstantType, limit?: number, skip?: number) {
       return new GetConstantTypeCommand(where);
    }
    static createGetTypeValuesByConstantTypeCommand(where: ConstantValue, parent: ConstantType, limit?:number) {
        return new GetConstantValueCommand(parent);
    }
}
