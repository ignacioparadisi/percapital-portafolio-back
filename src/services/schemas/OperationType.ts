import { gql } from 'apollo-server';

export const OperationTypeTypeDef = gql`
    type OperationType {
        id: Int
        name: String
        operations(where: OperationInput, limit: Int): [Operation]
    }

    input OperationTypeInput {
        id: Int
        name: String
    }

    type Query {
        getOperationTypes(where: OperationTypeInput, skip: Int, limit: Int): [OperationType]
    }

    type Mutation {
        createOperationType(insertData: OperationTypeInput!): OperationType
        updateOperationType(where: OperationTypeInput!, updateData: OperationTypeInput!): [OperationType]
        deleteOperationType(deleteData: OperationTypeInput): Int
    }
`
