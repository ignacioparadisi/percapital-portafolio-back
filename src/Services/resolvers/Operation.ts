import {PriceRv} from '@Common/Entities/PriceRv';
import {OperationType} from '@Common/Entities/OperationType';
import {Operation} from '@Common/Entities/Operation';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const OperationResolver = {
    Query: {
        getOperations: async (parent: any, args: GraphQLQuery) => {
            console.info('getOperations parent:', parent, 'args: ',args);
            const where = new Operation(args.where)
            const command = CommandFactory.createGetOperationsCommand(where, args.limit, args.skip);
            return null;
        }
    },
    Operation: {
        operationType: async (parent: Operation, args: GraphQLQuery) => {
            console.info('operationType parent: ', parent, 'args: ',args)
            const where = new OperationType(args.where);
            const command = CommandFactory.createGetOperationTypeByOperationCommand(where, parent);
            return null;
        },
        priceRv: async (parent: Operation, args: GraphQLQuery) => {
            console.info('priceRv parent: ', parent, 'args: ',args)
            const where = new PriceRv(args.where);
            const command = CommandFactory.createGetPriceRvByOperationCommand(where, parent);
            return null;
        },
    },
    Mutation: {
        createOperation: async (parent: any, args: GraphQLMutation) => {
            console.info('createOperation parent: ', parent, 'args: ',args);
            const createData = new Operation(args.insertData);
            const command = CommandFactory.createCreateOperationCommand(createData);
            return null;
        },
        updateOperation: async (parent: any, args: GraphQLMutation) => {
            console.info('updateOperation parent: ', parent, 'args: ',args);
            const where = new Operation(args.where);
            const updateData = new Operation(args.updateData)
            const command = CommandFactory.createUpdateOperationCommand(where, updateData);
            return null;
        },
        deleteOperation: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteOperation parent: ', parent, 'args: ',args);
            const deleteData = new Operation(args.deleteData);
            const command = CommandFactory.createDeleteOperationCommand(deleteData);
            return null;
        }
    }
}
