import {gql} from 'apollo-server';
export const PriceRvTypeDef = gql`
    type PriceRv {
        id: Int
        setId: Int
        exrId: Int
        bolivaresPrice: Float
        createdAt: String
        closeDate: String
        operations(where: OperationInput, limit: Int): [Operation]
        exchangeRate(where: ExchangeRateInput): ExchangeRate
        stockExchangeTitle(where: StockExchangeTitleInput): StockExchangeTitle
    }

    input PriceRvInput {
        id: Int
        setId: Int
        exrId: Int
        bolivaresPrice: Float
        createdAt: String
        closeDate: String
    }

    type Query {
        getPriceRvs(where: PriceRvInput, skip:Int, limit: Int): [PriceRv]
    }
    type Mutation {
        createPriceRv(insertData: PriceRvInput!): PriceRv
        updatePriceRv(where: PriceRvInput! updateData: PriceRvInput!): [PriceRv]
        deletePriceRv(deleteData: PriceRvInput): Int
    }
`
