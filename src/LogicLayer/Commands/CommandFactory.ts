import {GetExchangeRateByPriceRvCommand} from '@Logic/Commands/ExchangeRate/GetExchangeRateByPriceRvCommand';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {CreateExchangeRateCommand} from '@Logic/Commands/ExchangeRate/CreateExchangeRateCommand';
import {GetExchangeRatesCommand} from '@Logic/Commands/ExchangeRate/GetExchangeRatesCommand';
import {UpdateExchangeRateCommand} from '@Logic/Commands/ExchangeRate/UpdateExchangeRateCommand';
import {DeleteExchangeRateCommand} from '@Logic/Commands/ExchangeRate/DeleteExchangeRateCommand';
import {GetPriceRvsByStockExchangeTitleCommand} from '@Logic/Commands/PriceRv/GetPriceRvsByStockExchangeTitleCommand';
import {GetPriceRvsByExchangeRateCommand} from '@Logic/Commands/PriceRv/GetPriceRvsByExchangeRateCommand';
import {GetPriceRvByOperationCommand} from '@Logic/Commands/PriceRv/GetPriceRvByOperationCommand';
import {PriceRv} from '@Common/Entities/PriceRv';
import {CreatePriceRvCommand} from '@Logic/Commands/PriceRv/CreatePriceRvCommand';
import {GetPriceRvsCommand} from '@Logic/Commands/PriceRv/GetPriceRvsCommand';
import {UpdatePriceRvCommand} from '@Logic/Commands/PriceRv/UpdatePriceRvCommand';
import {DeletePriceRvCommand} from '@Logic/Commands/PriceRv/DeletePriceRvCommand';
import {GetStockExchangeTitleByPriceRvCommand} from '@Logic/Commands/StockExchangeTitle/GetStockExchangeTitleByPriceRvCommand';
import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {CreateStockExchangeTitleCommand} from '@Logic/Commands/StockExchangeTitle/CreateStockExchangeTitleCommand';
import {GetStockExchangeTitlesCommand} from '@Logic/Commands/StockExchangeTitle/GetStockExchangeTitlesCommand';
import {UpdateStockExchangeTitleCommand} from '@Logic/Commands/StockExchangeTitle/UpdateStockExchangeTitleCommand';
import {DeleteStockExchangeTitleCommand} from '@Logic/Commands/StockExchangeTitle/DeleteStockExchangeTitleCommand';
import {GetOperationTypeByOperationCommand} from '@Logic/Commands/OperationType/GetOperationTypeByOperationCommand';
import {OperationType} from '@Common/Entities/OperationType';
import {CreateOperationTypeCommand} from '@Logic/Commands/OperationType/CreateOperationTypeCommand';
import {GetOperationTypesCommand} from '@Logic/Commands/OperationType/GetOperationTypesCommand';
import {UpdateOperationTypeCommand} from '@Logic/Commands/OperationType/UpdateOperationTypeCommand';
import {DeleteOperationTypeCommand} from '@Logic/Commands/OperationType/DeleteOperationTypeCommand';
import {GetOperationsByPriceRvCommand} from '@Logic/Commands/Operation/GetOperationsByPriceRvCommand';
import {GetOperationsByOperationTypeCommand} from '@Logic/Commands/Operation/GetOperationsByOperationTypeCommand';
import {Operation} from '@Common/Entities/Operation';
import {CreateOperationCommand} from '@Logic/Commands/Operation/CreateOperationCommand';
import {GetOperationsCommand} from '@Logic/Commands/Operation/GetOperationsCommand';
import {UpdateOperationCommand} from '@Logic/Commands/Operation/UpdateOperationCommand';
import {DeleteOperationCommand} from '@Logic/Commands/Operation/DeleteOperationCommand';
import {GetTypeValuesByConstantTypeCommand} from '@Logic/Commands/TypeValue/GetTypeValuesByConstantTypeCommand';
import {TypeValue} from '@Common/Entities/TypeValue';
import {CreateTypeValueCommand} from '@Logic/Commands/TypeValue/CreateTypeValueCommand';
import {GetTypeValuesCommand} from '@Logic/Commands/TypeValue/GetTypeValuesCommand';
import {UpdateTypeValueCommand} from '@Logic/Commands/TypeValue/UpdateTypeValueCommand';
import {DeleteTypeValueCommand} from '@Logic/Commands/TypeValue/DeleteTypeValueCommand';
import {GetConstantTypeByTypeValueCommand} from '@Logic/Commands/ConstantType/GetConstantTypeByTypeValueCommand';
import {ConstantType} from '@Common/Entities/ConstantType';
import {CreateConstantTypeCommand} from '@Logic/Commands/ConstantType/CreateConstantTypeCommand';
import {GetConstantTypesCommand} from '@Logic/Commands/ConstantType/GetConstantTypesCommand';
import {UpdateConstantTypeCommand} from '@Logic/Commands/ConstantType/UpdateConstantTypeCommand';
import {DeleteConstantTypeCommand} from '@Logic/Commands/ConstantType/DeleteConstantTypeCommand';

export class CommandFactory {
    private constructor() {}
    static createCreateConstantTypeCommand(insertData: ConstantType) {
        return new CreateConstantTypeCommand(insertData)
    }
    static createGetConstantTypesCommand(where: ConstantType, limit?: number, skip?: number) {
       return new GetConstantTypesCommand(where, limit, skip);
    }
    static createUpdateConstantTypeCommand(where: ConstantType, updateData: ConstantType) {
       return new UpdateConstantTypeCommand(where, updateData);
    }
    static createDeleteConstantTypeCommand(deleteData: ConstantType) {
        return new DeleteConstantTypeCommand(deleteData);
    }
    static createGetConstantTypeByTypeValueCommand (where: ConstantType, parent: TypeValue) {
        return new GetConstantTypeByTypeValueCommand(where, parent);
    }
    static createCreateTypeValueCommand(insertData: TypeValue) {
        return new CreateTypeValueCommand(insertData)
    }
    static createGetTypeValuesCommand(where: TypeValue, limit?: number, skip?: number) {
       return new GetTypeValuesCommand(where, limit, skip);
    }
    static createUpdateTypeValueCommand(where: TypeValue, updateData: TypeValue) {
       return new UpdateTypeValueCommand(where, updateData);
    }
    static createDeleteTypeValueCommand(deleteData: TypeValue) {
        return new DeleteTypeValueCommand(deleteData);
    }
    static createGetTypeValuesByConstantTypeCommand(where: TypeValue, parent: ConstantType, limit?:number) {
        return new GetTypeValuesByConstantTypeCommand(where, parent, limit);
    }
    static createCreateOperationCommand(insertData: Operation) {
        return new CreateOperationCommand(insertData)
    }
    static createGetOperationsCommand(where: Operation, limit?: number, skip?: number) {
       return new GetOperationsCommand(where, limit, skip);
    }
    static createUpdateOperationCommand(where: Operation, updateData: Operation) {
       return new UpdateOperationCommand(where, updateData);
    }
    static createDeleteOperationCommand(deleteData: Operation) {
        return new DeleteOperationCommand(deleteData);
    }
    static createGetOperationsByOperationTypeCommand(where: Operation, parent: OperationType, limit?:number) {
        return new GetOperationsByOperationTypeCommand(where, parent, limit);
    }
    static createGetOperationsByPriceRvCommand(where: Operation, parent: PriceRv, limit?:number) {
        return new GetOperationsByPriceRvCommand(where, parent, limit);
    }
    static createCreateOperationTypeCommand(insertData: OperationType) {
        return new CreateOperationTypeCommand(insertData)
    }
    static createGetOperationTypesCommand(where: OperationType, limit?: number, skip?: number) {
       return new GetOperationTypesCommand(where, limit, skip);
    }
    static createUpdateOperationTypeCommand(where: OperationType, updateData: OperationType) {
       return new UpdateOperationTypeCommand(where, updateData);
    }
    static createDeleteOperationTypeCommand(deleteData: OperationType) {
        return new DeleteOperationTypeCommand(deleteData);
    }
    static createGetOperationTypeByOperationCommand (where: OperationType, parent: Operation) {
        return new GetOperationTypeByOperationCommand(where, parent);
    }
    static createCreateStockExchangeTitleCommand(insertData: StockExchangeTitle) {
        return new CreateStockExchangeTitleCommand(insertData)
    }
    static createGetStockExchangeTitlesCommand(where: StockExchangeTitle, limit?: number, skip?: number) {
       return new GetStockExchangeTitlesCommand(where, limit, skip);
    }
    static createUpdateStockExchangeTitleCommand(where: StockExchangeTitle, updateData: StockExchangeTitle) {
       return new UpdateStockExchangeTitleCommand(where, updateData);
    }
    static createDeleteStockExchangeTitleCommand(deleteData: StockExchangeTitle) {
        return new DeleteStockExchangeTitleCommand(deleteData);
    }
    static createGetStockExchangeTitleByPriceRvCommand (where: StockExchangeTitle, parent: PriceRv) {
        return new GetStockExchangeTitleByPriceRvCommand(where, parent);
    }
    static createCreatePriceRvCommand(insertData: PriceRv) {
        return new CreatePriceRvCommand(insertData)
    }
    static createGetPriceRvsCommand(where: PriceRv, limit?: number, skip?: number) {
       return new GetPriceRvsCommand(where, limit, skip);
    }
    static createUpdatePriceRvCommand(where: PriceRv, updateData: PriceRv) {
       return new UpdatePriceRvCommand(where, updateData);
    }
    static createDeletePriceRvCommand(deleteData: PriceRv) {
        return new DeletePriceRvCommand(deleteData);
    }
    static createGetPriceRvByOperationCommand (where: PriceRv, parent: Operation) {
        return new GetPriceRvByOperationCommand(where, parent);
    }
    static createGetPriceRvsByExchangeRateCommand(where: PriceRv, parent: ExchangeRate, limit?:number) {
        return new GetPriceRvsByExchangeRateCommand(where, parent, limit);
    }
    static createGetPriceRvsByStockExchangeTitleCommand(where: PriceRv, parent: StockExchangeTitle, limit?:number) {
        return new GetPriceRvsByStockExchangeTitleCommand(where, parent, limit);
    }
    static createCreateExchangeRateCommand(insertData: ExchangeRate) {
        return new CreateExchangeRateCommand(insertData)
    }
    static createGetExchangeRatesCommand(where: ExchangeRate, limit?: number, skip?: number) {
       return new GetExchangeRatesCommand(where, limit, skip);
    }
    static createUpdateExchangeRateCommand(where: ExchangeRate, updateData: ExchangeRate) {
       return new UpdateExchangeRateCommand(where, updateData);
    }
    static createDeleteExchangeRateCommand(deleteData: ExchangeRate) {
        return new DeleteExchangeRateCommand(deleteData);
    }
    static createGetExchangeRateByPriceRvCommand (where: ExchangeRate, parent: PriceRv) {
        return new GetExchangeRateByPriceRvCommand(where, parent);
    }
}
