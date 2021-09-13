import {mergeResolvers} from "@graphql-tools/merge";
import { ConstantTypeResolver } from '@Services/resolvers/ConstantType';
import { TypeValueResolver } from '@Services/resolvers/TypeValue';
import { OperationResolver } from '@Services/resolvers/Operation';
import { OperationTypeResolver } from '@Services/resolvers/OperationType';
import { StockExchangeTitleResolver } from '@Services/resolvers/StockExchangeTitle';
import { PriceRvResolver } from '@Services/resolvers/PriceRv';
import { ExchangeRateResolver } from '@Services/resolvers/ExchangeRate';

export const resolvers = mergeResolvers([
    ConstantTypeResolver,
    TypeValueResolver,
    OperationResolver,
    OperationTypeResolver,
    StockExchangeTitleResolver,
    PriceRvResolver,
    ExchangeRateResolver
])