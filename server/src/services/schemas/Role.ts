import { gql } from 'apollo-server';

export const RoleTypeDef = gql`
    type Role {
        id: Int
        name: String
        createdAt: String
    }

    input RoleInput {
        id: Int
        name: String
        createdAt: String
    }
`
