import { gql } from 'apollo-server';

export const PortfolioTypeDef = gql`
    type Portfolio {
        id: Int
        titleSymbol: String
        titleDesc: String
        stockPrice: Float
        stockInFolio: Float
        avgBuyPrice: Float
        buyTotalCost: Float
        dollarBuyTotalCost: Float
        marketNetValue: Float
        dollarMarketNetValue: Float
        rawValue: Float
        dollarRawValue: Float
        rawSells: Float
        dollarRawSells: Float
        netGp: Float
        dollarNetGp: Float
        variation: Float
        dollarVariation: Float
        percentageInFolio: Float
    }

    type PortfolioPage {
        data: [Portfolio]
        total: Int
        totalStocksAmount: Float
        totalBuyTotalCost: Float
        totalDollarBuyTotalCost: Float
        totalNetMarketValue: Float
        totalDollarNetMarketValue: Float
        totalRawValue: Float
        totalDollarRawValue: Float
        totalNetGp: Float
        totalDollarNetGp: Float
    }

    input PortfolioInput {
        id: Int
        titleSymbol: String
    }

    type Query {
        getPortfolio(where: PortfolioInput, skip: Int, limit: Int): PortfolioPage
            @auth(requires: USER)
    }
`