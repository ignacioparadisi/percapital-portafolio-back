import { mergeTypeDefs } from "@graphql-tools/merge";
import { ConstantTypeTypeDef } from "@Services/schemas/ConstantType";
import { TypeValueTypeDef } from "@Services/schemas/TypeValue";
import { OperationTypeDef } from "@Services/schemas/Operation";
import { OperationTypeTypeDef } from "@Services/schemas/OperationType";
import { StockExchangeTitleTypeDef } from "@Services/schemas/StockExchangeTitle";
import { PriceRVTypeDef } from "@Services/schemas/PriceRV";
import { ExchangeRateTypeDef } from "@Services/schemas/ExchangeRate";
import { UserTypeDef } from "@Services/schemas/User";
import { RoleTypeDef } from "@Services/schemas/Role";

export const typeDefs = mergeTypeDefs([
    ConstantTypeTypeDef,
    TypeValueTypeDef,
    OperationTypeDef,
    OperationTypeTypeDef,
    StockExchangeTitleTypeDef,
    PriceRVTypeDef,
    ExchangeRateTypeDef,
    UserTypeDef,
    RoleTypeDef
])