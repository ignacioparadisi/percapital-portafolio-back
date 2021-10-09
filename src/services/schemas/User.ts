import { gql } from 'apollo-server';

export const UserTypeDef = gql`
    type User {
        id: Int
        name: String
        email: String
        password: String
        createdAt: String
        roles(where: UserInput, limit: Int): [Role]
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
        getUsers(where: UserInput, skip: Int, limit: Int): [User]
            @auth(requires: ADMIN)
    }

    type Mutation {
        updateUser(where: UserInput!, updateData: UserInput!): [User]
            @auth(requires: ADMIN)
        deleteUser(deleteData: UserInput): Int
            @auth(requires: ADMIN)
    }
`