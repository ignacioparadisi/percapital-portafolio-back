import {gql} from 'apollo-server';
export const ConstantTypeTypeDef = gql`
    type ConstantType {
        id: Int
        name: String
        createdAt: String
        typeValues(where: TypeValueInput, limit: Int): [TypeValue]
    }

    input ConstantTypeInput {
        id: Int
        name: String
        createdAt: String
    }

    type Query {
        getConstantTypes(where: ConstantTypeInput, skip:Int, limit: Int): [ConstantType]
    }
    type Mutation {
        updateConstantType(where: ConstantTypeInput! updateData: ConstantTypeInput!): [ConstantType]
        deleteConstantType(deleteData: ConstantTypeInput): Int
    }
`
