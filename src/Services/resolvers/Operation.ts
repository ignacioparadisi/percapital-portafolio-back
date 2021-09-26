import { PriceRV } from '@Common/Entities/PriceRV';
import { OperationType } from '@Common/Entities/OperationType';
import { Operation } from '@Common/Entities/Operation';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';
import { OperationsCommandFactory } from '@Logic/Commands/Operations/OperationsCommandFactory';
import { ExecutionContext } from 'graphql/execution/execute';

export const OperationResolver = {
    Query: {
        getOperations: async (parent: any, args: GraphQLQuery, context: ExecutionContext) => {
            console.info('getOperations parent:', parent, 'args: ',args);
            const where = new Operation(args.where as Operation);
            // @ts-ignore
            where.userId = context.user.id;
            const command = OperationsCommandFactory.createGetOperationsCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    Operation: {
        operationType: async (parent: Operation, args: GraphQLQuery) => {
            console.info('operationType parent: ', parent, 'args: ',args)
            const where = new OperationType(args.where);
            return null;
        },
        priceRv: async (parent: Operation, args: GraphQLQuery) => {
            console.info('priceRv parent: ', parent, 'args: ',args)
            const where = new PriceRV(args.where);
            return null;
        },
    },
    Mutation: {
        createOperation: async (parent: any, args: GraphQLMutation) => {
            console.info('createOperation parent: ', parent, 'args: ',args);
            const createData = new Operation(args.insertData as Operation);
            return null;
        },
        updateOperation: async (parent: any, args: GraphQLMutation) => {
            console.info('updateOperation parent: ', parent, 'args: ',args);
            const where = new Operation(args.where as Operation);
            const updateData = new Operation(args.updateData as Operation)
            return null;
        },
        deleteOperation: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteOperation parent: ', parent, 'args: ',args);
            const deleteData = new Operation(args.deleteData as Operation);
            return null;
        }
    }
}
