import {IExchangeRateDAO} from '@Persistence/DAO/ExchangeRate/IExchangeRateDAO';
import {IPriceRvDAO} from '@Persistence/DAO/PriceRv/IPriceRvDAO';
import {IStockExchangeTitleDAO} from '@Persistence/DAO/StockExchangeTitle/IStockExchangeTitleDAO';
import {IOperationTypeDAO} from '@Persistence/DAO/OperationType/IOperationTypeDAO';
import {IOperationDAO} from '@Persistence/DAO/Operation/IOperationDAO';
import {ITypeValueDAO} from '@Persistence/DAO/TypeValue/ITypeValueDAO';
import {IConstantTypeDAO} from '@Persistence/DAO/ConstantType/IConstantTypeDAO';

export abstract class AbstractDAOFactory {
    abstract createConstantTypeDAO(): IConstantTypeDAO;
    abstract createTypeValueDAO(): ITypeValueDAO;
    abstract createOperationDAO(): IOperationDAO;
    abstract createOperationTypeDAO(): IOperationTypeDAO;
    abstract createStockExchangeTitleDAO(): IStockExchangeTitleDAO;
    abstract createPriceRvDAO(): IPriceRvDAO;
    abstract createExchangeRateDAO(): IExchangeRateDAO;
}
