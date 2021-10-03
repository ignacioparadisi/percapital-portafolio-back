import { ConstantType } from "@Common/Entities/ConstantType";
import { ExchangeRate } from "@Common/Entities/ExchangeRate";
import { Operation } from "@Common/Entities/Operation";
import { OperationType } from "@Common/Entities/OperationType";
import { PriceRV } from "@Common/Entities/PriceRV";
import { StockExchangeTitle } from "@Common/Entities/StockExchangeTitle";
import { ConstantValue } from "@Common/Entities/ConstantValue";
import { GetConstantTypeCommand } from "./Constants/GetConstantTypeCommand";
import { GetConstantValueCommand } from "./Constants/GetConstantValueCommand";


export class CommandFactory {
    private constructor() {}
    static createGetConstantTypesCommand(where: ConstantType, limit?: number, skip?: number) {
       return new GetConstantTypeCommand(where);
    }
    static createGetTypeValuesByConstantTypeCommand(where: ConstantValue, parent: ConstantType, limit?:number) {
        return new GetConstantValueCommand(parent);
    }
}
