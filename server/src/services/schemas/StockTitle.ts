import { gql } from 'apollo-server';

export const StockTitleTypeDef = gql`
    type StockTitle {
        id: Int
        name: String
        symbol: String
        stockAmount: Int
        createdAt: String
        isinCode: String
        priceRvs(where: PriceRVInput, limit: Int): [PriceRV]
    }

    type StockTitlePage {
        data: [StockTitle]
        total: Int
    }

    input StockTitleInput {
        id: Int
        name: String
        symbol: String
        isinCode: String
        createdAt: String
    }

    type Query {
        getStockTitles(where: StockTitleInput, skip: Int, limit: Int): StockTitlePage
            @auth(requires: USER)
        getStockTitlesWithAmount: [StockTitle]
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
