import { User } from '@Common/entities/User';
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { UserCommandFactory } from '@Logic/commands/user/UserCommandFactory';
import { gql, AuthenticationError } from 'apollo-server';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export const AuthorizationTypeDef = gql`
    enum Permission {
        ADMIN
        USER
    }
    directive @auth(requires: Permission = USER) on OBJECT | FIELD_DEFINITION
`;

export function authDirectiveTransformer(schema: GraphQLSchema, directiveName: string) {
    let typeDirectiveArgumentMaps: Record<string, any> = {};
    return mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
            const authDirective = getDirective(schema, type, directiveName)?.[0];
            if (authDirective) {
                typeDirectiveArgumentMaps[type.name] = authDirective;
            }
            return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
            const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];
            if (authDirective) {
                const { requires } = authDirective;
                if (requires) {
                    const { resolve = defaultFieldResolver } = fieldConfig;
                    fieldConfig.resolve = async (source, args, context, info) => {
                        const userId = context.headers?.authorization;
                        if (!userId) {
                            throw new AuthenticationError('Not authenticated');
                        }
                        const headerUser = new User();
                        headerUser.id = Number(userId);
                        const command =  UserCommandFactory.createGetUsersCommand(headerUser);
                        const users = await command.execute();
                        if (users.length == 1) {
                            context.user = users[0];
                            return resolve(source, args, context, info);
                        }
                        throw new AuthenticationError('Not authenticated');
                    }
                }
                return fieldConfig;
            }
            return fieldConfig;
        }
    });    
}