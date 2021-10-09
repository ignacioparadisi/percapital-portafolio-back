import { mergeResolvers } from "@graphql-tools/merge";
import { ConstantTypeResolver } from '@Services/resolvers/ConstantType';
import { TypeValueResolver } from '@Services/resolvers/ConstantValue';
import { OperationResolver } from '@Services/resolvers/Operation';
import { OperationTypeResolver } from '@Services/resolvers/OperationType';
import { StockTitleResolver } from '@Services/resolvers/StockTitle';
import { PriceRVResolver } from '@Services/resolvers/PriceRV';
import { ExchangeRateResolver } from '@Services/resolvers/ExchangeRate';
import { UserResolver } from "@Services/resolvers/User";

export const resolvers = mergeResolvers([
    ConstantTypeResolver,
    TypeValueResolver,
    OperationResolver,
    OperationTypeResolver,
    StockTitleResolver,
    PriceRVResolver,
    ExchangeRateResolver,
    UserResolver
])