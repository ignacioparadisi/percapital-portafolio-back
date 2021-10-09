import { gql } from 'apollo-server';

export const StockTitleTypeDef = gql`
    type StockTitle {
        id: Int
        name: String
        symbol: String
        createdAt: String
        priceRvs(where: PriceRVInput, limit: Int): [PriceRV]
    }

    input StockTitleInput {
        id: Int
        name: String
        symbol: String
        createdAt: String
    }

    type Query {
        getStockTitles(where: StockTitleInput, skip: Int, limit: Int): [StockTitle] 
            @auth(requires: USER)
    }

    type Mutation {
        createStockTitle(insertData: StockTitleInput!): StockTitle
            @auth(requires: USER)
        updateStockTitle(where: StockTitleInput!, updateData: StockTitleInput!): [StockTitle]
            @auth(requires: USER)
        deleteStockTitle(deleteData: StockTitleInput): Int
            @auth(requires: USER)
    }
`
