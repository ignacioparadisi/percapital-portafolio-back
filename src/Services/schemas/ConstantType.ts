import {gql} from 'apollo-server';
export const ConstantTypeTypeDef = gql`
    type ConstantType {
        ctId: undefined
        ctName: String
        typeValues(where: TypeValueInput, limit: Int): [TypeValue]
    }

    input ConstantTypeInput {
        ctId: undefined
        ctName: String
    }

    type Query {
        getConstantTypes(where: ConstantTypeInput, skip:Int, limit: Int): [ConstantType]
    }
    type Mutation {
        createConstantType(insertData: ConstantTypeInput!): ConstantType
        updateConstantType(where: ConstantTypeInput! updateData: ConstantTypeInput!): [ConstantType]
        deleteConstantType(deleteData: ConstantTypeInput): Int
    }
`
