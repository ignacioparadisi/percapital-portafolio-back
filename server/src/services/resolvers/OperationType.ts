import { Operation } from '@Common/entities/Operation';
import { OperationType } from '@Common/entities/OperationType';
import { OperationTypeCommandFactory } from '@Logic/commands/operation_type/OperationTypeCommandFactory';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const OperationTypeResolver = {
    Query: {
        getOperationTypes: async (parent: any, args: GraphQLQuery) => {
            console.info('getOperationTypes parent:', parent, 'args: ',args);
            const where = new OperationType(args.where as OperationType);
            const command = OperationTypeCommandFactory.createGetOperationTypeCommand(where);
            return command.execute();
        }
    },
    OperationType: {
        operations: async (parent: OperationType, args: GraphQLQuery) => {
            console.info('operations parent: ', parent, 'args: ',args)
            const where = new Operation(args.where as Operation);
            return null;
        },
    },
    Mutation: {
        createOperationType: async (parent: any, args: GraphQLMutation) => {
            console.info('createOperationType parent: ', parent, 'args: ',args);
            return null;
        },
        updateOperationType: async (parent: any, args: GraphQLMutation) => {
            console.info('updateOperationType parent: ', parent, 'args: ',args);
            return null;
        },
        deleteOperationType: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteOperationType parent: ', parent, 'args: ',args);
            return null;
        }
    }
}
