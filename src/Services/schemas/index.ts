import {mergeTypeDefs} from "@graphql-tools/merge";
import { ConstantTypeTypeDef } from "@Services/schemas/ConstantType";
import { TypeValueTypeDef } from "@Services/schemas/TypeValue";
import { OperationTypeDef } from "@Services/schemas/Operation";
import { OperationTypeTypeDef } from "@Services/schemas/OperationType";
import { StockExchangeTitleTypeDef } from "@Services/schemas/StockExchangeTitle";
import { PriceRvTypeDef } from "@Services/schemas/PriceRv";
import { ExchangeRateTypeDef } from "@Services/schemas/ExchangeRate";

export const typeDefs = mergeTypeDefs([
    ConstantTypeTypeDef,
    TypeValueTypeDef,
    OperationTypeDef,
    OperationTypeTypeDef,
    StockExchangeTitleTypeDef,
    PriceRvTypeDef,
    ExchangeRateTypeDef
])