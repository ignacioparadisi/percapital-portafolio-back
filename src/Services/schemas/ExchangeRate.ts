import {gql} from 'apollo-server';
export const ExchangeRateTypeDef = gql`
    type ExchangeRate {
        erId: undefined
        erValue: undefined
        erCreationdate: undefined
        priceRvs(where: PriceRvInput, limit: Int): [PriceRv]
    }

    input ExchangeRateInput {
        erId: undefined
        erValue: undefined
        erCreationdate: undefined
    }

    type Query {
        getExchangeRates(where: ExchangeRateInput, skip:Int, limit: Int): [ExchangeRate]
    }
    type Mutation {
        createExchangeRate(insertData: ExchangeRateInput!): ExchangeRate
        updateExchangeRate(where: ExchangeRateInput! updateData: ExchangeRateInput!): [ExchangeRate]
        deleteExchangeRate(deleteData: ExchangeRateInput): Int
    }
`
