import {ConstantValue} from '@Common/Entities/ConstantValue';
import {ConstantType} from '@Common/Entities/ConstantType';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const ConstantTypeResolver = {
    Query: {
        getConstantTypes: async (parent: any, args: GraphQLQuery) => {
            console.info('getConstantTypes parent:', parent, 'args: ',args);
            const where = new ConstantType(args.where as ConstantType)
            const command = CommandFactory.createGetConstantTypesCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    ConstantType: {
        values: async (parent: ConstantType, args: GraphQLQuery) => {
            console.info('Constant Values parent: ', parent, 'args: ',args)
            const where = new ConstantValue(args.where as ConstantValue);
            const command = CommandFactory.createGetTypeValuesByConstantTypeCommand(where, parent, args.limit);
            return command.execute();
        },
    },
    Mutation: {
        updateConstantType: async (parent: any, args: GraphQLMutation) => {
            console.info('updateConstantType parent: ', parent, 'args: ',args);
            const where = new ConstantType(args.where as ConstantType);
            const updateData = new ConstantType(args.updateData as ConstantType)
            const command = CommandFactory.createUpdateConstantTypeCommand(where, updateData);
            return null;
        },
        deleteConstantType: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteConstantType parent: ', parent, 'args: ',args);
            const deleteData = new ConstantType(args.deleteData as ConstantType);
            const command = CommandFactory.createDeleteConstantTypeCommand(deleteData);
            return null;
        }
    }
}
