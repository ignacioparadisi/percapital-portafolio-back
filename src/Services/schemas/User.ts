import {gql} from 'apollo-server';
export const UserTypeDef = gql`
    type User {
        id: Int
        name: String
        email: String
        password: String
        createdAt: String
        roles(where: RoleInput!, limit: Int): [Role]
    }

    input UserInput {
        id: Int
        name: String
        email: String
        password: String
        roleId: Int
        createdAt: String
    }

    type Query {
        login(where: UserInput!, skip: Int, limit: Int): User
    }
    type Mutation {
        updateUser(where: UserInput! updateData: UserInput!): [User]
        deleteUser(deleteData: UserInput): Int
    }
`