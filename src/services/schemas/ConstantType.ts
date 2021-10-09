import { gql } from 'apollo-server';

export const ConstantTypeTypeDef = gql`
    type ConstantType {
        id: Int
        name: String
        createdAt: String
        values(where: TypeValueInput, limit: Int): [TypeValue]
    }

    input ConstantTypeInput {
        id: Int
        name: String
        createdAt: String
    }

    type Query {
        getConstantTypes(where: ConstantTypeInput, skip: Int, limit: Int): [ConstantType] 
            @auth(requires: USER)
    }

    type Mutation {
        updateConstantType(where: ConstantTypeInput!, updateData: ConstantTypeInput!): [ConstantType]
            @auth(requires: USER)
        deleteConstantType(deleteData: ConstantTypeInput): Int
            @auth(requires: USER)
    }
`
