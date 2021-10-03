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
        priceRV(where: PriceRVInput): PriceRV

        value: Float
        comission: Float
        iva: Float
        register: Float
        exchangeRate: Float

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

    input OperationInput {
        id: Int
        userId: Int
        priceRvId: Int
        createdAt: String
        stockAmount: Float
        stockPrice: Float
        typeId: Int
    }

    type Query {
        getOperations(where: OperationInput, skip: Int, limit: Int): [Operation]
    }

    type Mutation {
        createOperation(insertData: OperationInput!): Operation
        updateOperation(where: OperationInput!, updateData: OperationInput!): [Operation]
        deleteOperation(deleteData: OperationInput): Int
    }
`
