import {gql} from 'apollo-server';
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
        priceRv(where: PriceRvInput): PriceRv
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
        getOperations(where: OperationInput, skip:Int, limit: Int): [Operation]
    }
    type Mutation {
        createOperation(insertData: OperationInput!): Operation
        updateOperation(where: OperationInput! updateData: OperationInput!): [Operation]
        deleteOperation(deleteData: OperationInput): Int
    }
`
