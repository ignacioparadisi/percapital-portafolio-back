import {OperationDAO} from '@Persistence/DAO/Operation/OperationDAO';
import {ExchangeRateDAO} from '@Persistence/DAO/ExchangeRate/ExchangeRateDAO';
import {PriceRvDAO} from '@Persistence/DAO/PriceRv/PriceRvDAO';
import {StockExchangeTitleDAO} from '@Persistence/DAO/StockExchangeTitle/StockExchangeTitleDAO';
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
    createStockExchangeTitleDAO(): StockExchangeTitleDAO {
        return new StockExchangeTitleDAO();
    }
    createPriceRvDAO(): PriceRvDAO {
        return new PriceRvDAO();
    }
    createExchangeRateDAO(): ExchangeRateDAO {
        return new ExchangeRateDAO();
    }
    createOperationDAO(): OperationDAO {
        return new OperationDAO();
    }
}
