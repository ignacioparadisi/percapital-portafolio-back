import {Operation} from '@Common/Entities/Operation';
import {OperationType} from '@Common/Entities/OperationType';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const OperationTypeResolver = {
    Query: {
        getOperationTypes: async (parent: any, args: GraphQLQuery) => {
            console.info('getOperationTypes parent:', parent, 'args: ',args);
            const where = new OperationType(args.where)
            const command = CommandFactory.createGetOperationTypesCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    OperationType: {
        operations: async (parent: OperationType, args: GraphQLQuery) => {
            console.info('operations parent: ', parent, 'args: ',args)
            const where = new Operation(args.where);
            const command = CommandFactory.createGetOperationsByOperationTypeCommand(where, parent, args.limit);
            return command.execute();
        },
    },
    Mutation: {
        createOperationType: async (parent: any, args: GraphQLMutation) => {
            console.info('createOperationType parent: ', parent, 'args: ',args);
            const createData = new OperationType(args.insertData);
            const command = CommandFactory.createCreateOperationTypeCommand(createData);
            return command.execute();
        },
        updateOperationType: async (parent: any, args: GraphQLMutation) => {
            console.info('updateOperationType parent: ', parent, 'args: ',args);
            const where = new OperationType(args.where);
            const updateData = new OperationType(args.updateData)
            const command = CommandFactory.createUpdateOperationTypeCommand(where, updateData);
            return command.execute();
        },
        deleteOperationType: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteOperationType parent: ', parent, 'args: ',args);
            const deleteData = new OperationType(args.deleteData);
            const command = CommandFactory.createDeleteOperationTypeCommand(deleteData);
            return command.execute();
        }
    }
}
