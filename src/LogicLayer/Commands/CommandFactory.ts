import { ConstantType } from "@Common/Entities/ConstantType";
import { ExchangeRate } from "@Common/Entities/ExchangeRate";
import { Operation } from "@Common/Entities/Operation";
import { OperationType } from "@Common/Entities/OperationType";
import { PriceRv } from "@Common/Entities/PriceRv";
import { StockExchangeTitle } from "@Common/Entities/StockExchangeTitle";
import { ConstantValue } from "@Common/Entities/ConstantValue";
import { GetConstantTypeCommand } from "./GetConstantTypeCommand";


export class CommandFactory {
    private constructor() {}
    static createGetConstantTypesCommand(where: ConstantType, limit?: number, skip?: number) {
       return new GetConstantTypeCommand(where);
    }
    static createUpdateConstantTypeCommand(where: ConstantType, updateData: ConstantType) {
       return null;
    }
    static createDeleteConstantTypeCommand(deleteData: ConstantType) {
        return null;
    }
    static createGetConstantTypeByTypeValueCommand (where: ConstantType, parent: ConstantValue) {
        return null;
    }
    static createCreateTypeValueCommand(insertData: ConstantValue) {
        return null;
    }
    static createGetTypeValuesCommand(where: ConstantValue, limit?: number, skip?: number) {
       return null;
    }
    static createUpdateTypeValueCommand(where: ConstantValue, updateData: ConstantValue) {
       return null;
    }
    static createDeleteTypeValueCommand(deleteData: ConstantValue) {
        return null;
    }
    static createGetTypeValuesByConstantTypeCommand(where: ConstantValue, parent: ConstantType, limit?:number) {
        return null;
    }
    static createCreateOperationCommand(insertData: Operation) {
        return null;
    }
    static createGetOperationsCommand(where: Operation, limit?: number, skip?: number) {
       return null;
    }
    static createUpdateOperationCommand(where: Operation, updateData: Operation) {
       return null;
    }
    static createDeleteOperationCommand(deleteData: Operation) {
        return null;
    }
    static createGetOperationsByOperationTypeCommand(where: Operation, parent: OperationType, limit?:number) {
        return null;
    }
    static createGetOperationsByPriceRvCommand(where: Operation, parent: PriceRv, limit?:number) {
        return null;
    }
    static createCreateOperationTypeCommand(insertData: OperationType) {
        return null;
    }
    static createGetOperationTypesCommand(where: OperationType, limit?: number, skip?: number) {
       return null;
    }
    static createUpdateOperationTypeCommand(where: OperationType, updateData: OperationType) {
       return null;
    }
    static createDeleteOperationTypeCommand(deleteData: OperationType) {
        return null;
    }
    static createGetOperationTypeByOperationCommand (where: OperationType, parent: Operation) {
        return null;
    }
    static createCreateStockExchangeTitleCommand(insertData: StockExchangeTitle) {
        return null;
    }
    static createGetStockExchangeTitlesCommand(where: StockExchangeTitle, limit?: number, skip?: number) {
       return null;
    }
    static createUpdateStockExchangeTitleCommand(where: StockExchangeTitle, updateData: StockExchangeTitle) {
       return null;
    }
    static createDeleteStockExchangeTitleCommand(deleteData: StockExchangeTitle) {
        return null;
    }
    static createGetStockExchangeTitleByPriceRvCommand (where: StockExchangeTitle, parent: PriceRv) {
        return null;
    }
    static createCreatePriceRvCommand(insertData: PriceRv) {
        return null;
    }
    static createGetPriceRvsCommand(where: PriceRv, limit?: number, skip?: number) {
       return null;
    }
    static createUpdatePriceRvCommand(where: PriceRv, updateData: PriceRv) {
       return null;
    }
    static createDeletePriceRvCommand(deleteData: PriceRv) {
        return null;
    }
    static createGetPriceRvByOperationCommand (where: PriceRv, parent: Operation) {
        return null;
    }
    static createGetPriceRvsByExchangeRateCommand(where: PriceRv, parent: ExchangeRate, limit?:number) {
        return null;
    }
    static createGetPriceRvsByStockExchangeTitleCommand(where: PriceRv, parent: StockExchangeTitle, limit?:number) {
        return null;
    }
    static createCreateExchangeRateCommand(insertData: ExchangeRate) {
        return null;
    }
    static createGetExchangeRatesCommand(where: ExchangeRate, limit?: number, skip?: number) {
       return null;
    }
    static createUpdateExchangeRateCommand(where: ExchangeRate, updateData: ExchangeRate) {
       return null;
    }
    static createDeleteExchangeRateCommand(deleteData: ExchangeRate) {
        return null;
    }
    static createGetExchangeRateByPriceRvCommand (where: ExchangeRate, parent: PriceRv) {
        return null;
    }
}
