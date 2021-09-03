import {gql} from 'apollo-server';
export const OperationTypeDef = gql`
    type Operation {
        opId: undefined
        opPId: undefined
        opStId: undefined
        opErId: undefined
        opCreationdate: undefined
        opNumberofactions: undefined
        opPrice: undefined
        opType: String
        priceRv(where: PriceRvInput): PriceRv
        priceRv(where: PriceRvInput): PriceRv
        priceRv(where: PriceRvInput): PriceRv
    }

    input OperationInput {
        opId: undefined
        opPId: undefined
        opStId: undefined
        opErId: undefined
        opCreationdate: undefined
        opNumberofactions: undefined
        opPrice: undefined
        opType: String
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
