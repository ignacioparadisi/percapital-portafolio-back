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
            @auth(requires: USER)
    }

    type Mutation {
        createOperationType(insertData: OperationTypeInput!): OperationType
            @auth(requires: USER)
        updateOperationType(where: OperationTypeInput!, updateData: OperationTypeInput!): [OperationType]
            @auth(requires: USER)
        deleteOperationType(deleteData: OperationTypeInput): Int
            @auth(requires: USER)
    }
`
