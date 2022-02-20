import { mergeTypeDefs } from "@graphql-tools/merge";
import { ConstantTypeTypeDef } from "@Services/schemas/ConstantType";
import { TypeValueTypeDef } from "@Services/schemas/TypeValue";
import { OperationTypeDef } from "@Services/schemas/Operation";
import { OperationTypeTypeDef } from "@Services/schemas/OperationType";
import { StockTitleTypeDef } from "@Services/schemas/StockTitle";
import { PriceRVTypeDef } from "@Services/schemas/PriceRV";
import { ExchangeRateTypeDef } from "@Services/schemas/ExchangeRate";
import { UserTypeDef } from "@Services/schemas/User";
import { RoleTypeDef } from "@Services/schemas/Role";
import { AuthorizationTypeDef } from "@Services/directives/AuthDirective";
import { PortfolioTypeDef } from "./Portfolio";
import {StockHistoricTypeDef} from "@Services/schemas/StockHistoric";

export const typeDefs = mergeTypeDefs([
    AuthorizationTypeDef,
    ConstantTypeTypeDef,
    TypeValueTypeDef,
    OperationTypeDef,
    OperationTypeTypeDef,
    StockTitleTypeDef,
    PriceRVTypeDef,
    ExchangeRateTypeDef,
    UserTypeDef,
    RoleTypeDef,
    PortfolioTypeDef,
    StockHistoricTypeDef
])