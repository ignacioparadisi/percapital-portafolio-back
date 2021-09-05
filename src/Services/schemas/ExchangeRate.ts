import {gql} from 'apollo-server';
export const ExchangeRateTypeDef = gql`
    type ExchangeRate {
        id: Int
        value: Float
        createdAt: String
        priceRvs(where: PriceRvInput, limit: Int): [PriceRv]
    }

    input ExchangeRateInput {
        id: Int
        value: Float
        createdAt: String
    }

    type Query {
        getExchangeRates(id: Int!, skip:Int, limit: Int): [ExchangeRate]
    }
    type Mutation {
        createExchangeRate(insertData: ExchangeRateInput!): ExchangeRate
        updateExchangeRate(where: ExchangeRateInput! updateData: ExchangeRateInput!): [ExchangeRate]
        deleteExchangeRate(deleteData: ExchangeRateInput): Int
    }
`
