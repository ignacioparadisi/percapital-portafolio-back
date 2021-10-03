import { gql } from 'apollo-server';

export const TypeValueTypeDef = gql`
    type TypeValue {
        id: Int
        cotId: Int
        value: Float
        createdAt: String
        constantType(where: ConstantTypeInput): ConstantType
    }

    input TypeValueInput {
        id: Int
        cotId: Int
        value: Float
        createdAt: String
    }

    type Query {
        getTypeValues(where: TypeValueInput, skip: Int, limit: Int): [TypeValue]
    }

    type Mutation {
        createTypeValue(insertData: TypeValueInput!): TypeValue
        updateTypeValue(where: TypeValueInput!, updateData: TypeValueInput!): [TypeValue]
        deleteTypeValue(deleteData: TypeValueInput): Int
    }
`
