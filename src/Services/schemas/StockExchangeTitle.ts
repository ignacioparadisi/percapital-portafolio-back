import {gql} from 'apollo-server';
export const StockExchangeTitleTypeDef = gql`
    type StockExchangeTitle {
        stId: undefined
        stDescription: undefined
        stValue: String
        stCreationdate: undefined
        priceRvs(where: PriceRvInput, limit: Int): [PriceRv]
    }

    input StockExchangeTitleInput {
        stId: undefined
        stDescription: undefined
        stValue: String
        stCreationdate: undefined
    }

    type Query {
        getStockExchangeTitles(where: StockExchangeTitleInput, skip:Int, limit: Int): [StockExchangeTitle]
    }
    type Mutation {
        createStockExchangeTitle(insertData: StockExchangeTitleInput!): StockExchangeTitle
        updateStockExchangeTitle(where: StockExchangeTitleInput! updateData: StockExchangeTitleInput!): [StockExchangeTitle]
        deleteStockExchangeTitle(deleteData: StockExchangeTitleInput): Int
    }
`
