import { PriceRV } from '@Common/entities/PriceRV';
import { OperationType } from '@Common/entities/OperationType';
import { Operation } from '@Common/entities/Operation';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';
import { OperationsCommandFactory } from '@Logic/commands/operations/OperationsCommandFactory';
import { ExecutionContext } from 'graphql/execution/execute';
import { PriceRVCommandFactory } from '@Logic/commands/price_rv/PriceRVCommandFactory';
import { GetOperationTypeCommand } from '@Logic/commands/operation_type/GetOperationTypeCommand';
import { OperationTypeCommandFactory } from '@Logic/commands/operation_type/OperationTypeCommandFactory';

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
            const where = new OperationType();
            where.id = parent.typeId;
            const command = OperationTypeCommandFactory.createGetOperationTypeForOperationCommand(where);
            let result = await command.execute();
            if (result.length > 0) {
                return result[0];
            }
            return null;
        },
        priceRV: async (parent: Operation, args: GraphQLQuery) => {
            console.info('priceRv parent: ', parent, 'args: ',args);
            const where = new PriceRV();
            where.id = parent.priceRvId;
            const command = PriceRVCommandFactory.createGetPriceRVCommand(where);
            let result = await command.execute();
            if (result.length > 0) {
                return result[0];
            }
            return null;
        },
    },
    Mutation: {
        createOperation: async (parent: any, args: GraphQLMutation) => {
            console.info('createOperation parent: ', parent, 'args: ',args);
            const createData = new Operation(args.insertData as Operation);
            const command = OperationsCommandFactory.createCreateOperationCommand(createData);
            return command.execute();
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
