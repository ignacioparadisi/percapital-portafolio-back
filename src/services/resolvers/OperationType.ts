import { Operation } from '@Common/entities/Operation';
import { OperationType } from '@Common/entities/OperationType';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const OperationTypeResolver = {
    Query: {
        getOperationTypes: async (parent: any, args: GraphQLQuery) => {
            console.info('getOperationTypes parent:', parent, 'args: ',args);
            const where = new OperationType(args.where)
            return null;
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
            const createData = new OperationType(args.insertData);
            return null;
        },
        updateOperationType: async (parent: any, args: GraphQLMutation) => {
            console.info('updateOperationType parent: ', parent, 'args: ',args);
            const where = new OperationType(args.where);
            const updateData = new OperationType(args.updateData)
            return null;
        },
        deleteOperationType: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteOperationType parent: ', parent, 'args: ',args);
            const deleteData = new OperationType(args.deleteData);
            return null;
        }
    }
}
