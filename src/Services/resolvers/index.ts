import { mergeResolvers } from "@graphql-tools/merge";
import { ConstantTypeResolver } from '@Services/resolvers/ConstantType';
import { TypeValueResolver } from '@Services/resolvers/ConstantValue';
import { OperationResolver } from '@Services/resolvers/Operation';
import { OperationTypeResolver } from '@Services/resolvers/OperationType';
import { StockExchangeTitleResolver } from '@Services/resolvers/StockExchangeTitle';
import { PriceRVResolver } from '@Services/resolvers/PriceRV';
import { ExchangeRateResolver } from '@Services/resolvers/ExchangeRate';
import { UserResolver } from "./User";

export const resolvers = mergeResolvers([
    ConstantTypeResolver,
    TypeValueResolver,
    OperationResolver,
    OperationTypeResolver,
    StockExchangeTitleResolver,
    PriceRVResolver,
    ExchangeRateResolver,
    UserResolver
])