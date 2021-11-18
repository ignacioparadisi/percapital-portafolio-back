import { gql } from 'apollo-server';

export const OperationTypeDef = gql`
    type Operation {
        id: Int
        userId: Int
        priceRvId: Int
        createdAt: String
        stockAmount: Float
        stockPrice: Float
        typeId: Int
        operationType(where: OperationTypeInput): OperationType
        stockTitle(where: StockTitleInput): StockTitle

        value: Float
        comission: Float
        iva: Float
        register: Float
        exchangeRate: Float
        otherComission: Float

        sellNetValue: Float
        sellRawDollarValue: Float
        sellDollarNetValue: Float

        buyTotalCost: Float
        buyUnitTotalPrice: Float
        buyDollarTotalCost: Float
        buyDollarUnitTotalPrice: Float
        buyMarketPrice: Float
        buyVariation: Float
        buyMarketValue: Float
        buyComissionPercentage: Float
        buyIvaPercentage: Float
        buyRegisterPercentage: Float
        buyTotalIncome: Float
        buyGpValue: Float
        buyPerformanceValue: Float
        buyWeightInWallet: Float
        buyWeightedPerformance: Float
        buyDollarGp: Float
        buyDollarPerformanceValue: Float
        buyDollarWeightedPerformance: Float
    }

    type OperationPage {
        data: [Operation]
        total: Int
    }

    input OperationInput {
        id: Int
        userId: Int
        titleId: Int
        createdAt: String
        stockAmount: Float
        stockPrice: Float
        exchangeRate: Float
        typeId: Int
        ivaCvId: Int
        comissionCvId: Int
        registerCvId: Int
        otherComission: Float
    }

    type Query {
        getOperations(where: OperationInput, skip: Int, limit: Int): OperationPage
            @auth(requires: USER)
    }

    type Mutation {
        createOperation(insertData: OperationInput!): Operation
            @auth(requires: USER)
        updateOperation(where: OperationInput!, updateData: OperationInput!): [Operation]
            @auth(requires: USER)
        deleteOperation(deleteData: OperationInput): Int
            @auth(requires: USER)
    }
`
