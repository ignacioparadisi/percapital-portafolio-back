import { gql } from 'apollo-server';

export const TypeValueTypeDef = gql`
    type TypeValue {
        id: Int
        constantTypeId: Int
        value: Float
        createdAt: String
        constantType(where: ConstantTypeInput): ConstantType
    }

    input TypeValueInput {
        id: Int
        constantTypeId: Int
        value: Float
        createdAt: String
    }

    type Query {
        getTypeValues(where: TypeValueInput, skip: Int, limit: Int): [TypeValue]
    }

    type Mutation {
        createTypeValue(insertData: TypeValueInput!): TypeValue
            @auth(requires: USER)
        updateTypeValue(where: TypeValueInput!, updateData: TypeValueInput!): [TypeValue]
            @auth(requires: USER)
        deleteTypeValue(deleteData: TypeValueInput): Int
            @auth(requires: USER)
    }
`
