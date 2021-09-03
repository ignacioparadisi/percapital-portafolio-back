import {gql} from 'apollo-server';
export const TypeValueTypeDef = gql`
    type TypeValue {
        tvId: undefined
        tvCtId: undefined
        tvValue: undefined
        tvCreationdate: undefined
        constantType(where: ConstantTypeInput): ConstantType
    }

    input TypeValueInput {
        tvId: undefined
        tvCtId: undefined
        tvValue: undefined
        tvCreationdate: undefined
    }

    type Query {
        getTypeValues(where: TypeValueInput, skip:Int, limit: Int): [TypeValue]
    }
    type Mutation {
        createTypeValue(insertData: TypeValueInput!): TypeValue
        updateTypeValue(where: TypeValueInput! updateData: TypeValueInput!): [TypeValue]
        deleteTypeValue(deleteData: TypeValueInput): Int
    }
`
