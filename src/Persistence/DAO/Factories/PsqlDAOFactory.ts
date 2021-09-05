import {ExchangeRateDAO} from '@Persistence/DAO/ExchangeRate/ExchangeRateDAO';
import {PriceRvDAO} from '@Persistence/DAO/PriceRv/PriceRvDAO';
import {StockExchangeTitleDAO} from '@Persistence/DAO/StockExchangeTitle/StockExchangeTitleDAO';
import {OperationTypeDAO} from '@Persistence/DAO/OperationType/OperationTypeDAO';
import {OperationDAO} from '@Persistence/DAO/Operation/OperationDAO';
import {TypeValueDAO} from '@Persistence/DAO/TypeValue/TypeValueDAO';
import {ConstantTypeDAO} from '@Persistence/DAO/ConstantType/ConstantTypeDAO';
import {AbstractDAOFactory} from '@Persistence/DAO/Factories/AbstractDAOFactory';
export class PsqlDAOFactory extends AbstractDAOFactory {
    createConstantTypeDAO(): ConstantTypeDAO {
        return new ConstantTypeDAO();
    }
    createTypeValueDAO(): TypeValueDAO {
        return new TypeValueDAO();
    }
    createOperationDAO(): OperationDAO {
        return new OperationDAO();
    }
    createOperationTypeDAO(): OperationTypeDAO {
        return new OperationTypeDAO();
    }
    createStockExchangeTitleDAO(): StockExchangeTitleDAO {
        return new StockExchangeTitleDAO();
    }
    createPriceRvDAO(): PriceRvDAO {
        return new PriceRvDAO();
    }
    createExchangeRateDAO(): ExchangeRateDAO {
        return new ExchangeRateDAO();
    }
}
