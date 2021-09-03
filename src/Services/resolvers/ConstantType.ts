import {TypeValue} from '@Common/Entities/TypeValue';
import {ConstantType} from '@Common/Entities/ConstantType';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const ConstantTypeResolver = {
    Query: {
        getConstantTypes: async (parent: any, args: GraphQLQuery) => {
            console.info('getConstantTypes parent:', parent, 'args: ',args);
            const where = new ConstantType(args.where)
            const command = CommandFactory.createGetConstantTypesCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    ConstantType: {
        typeValues: async (parent: ConstantType, args: GraphQLQuery) => {
            console.info('typeValues parent: ', parent, 'args: ',args)
            const where = new TypeValue(args.where);
            const command = CommandFactory.createGetTypeValuesByConstantTypeCommand(where, parent, args.limit);
            return command.execute();
        },
    },
    Mutation: {
        createConstantType: async (parent: any, args: GraphQLMutation) => {
            console.info('createConstantType parent: ', parent, 'args: ',args);
            const createData = new ConstantType(args.insertData);
            const command = CommandFactory.createCreateConstantTypeCommand(createData);
            return command.execute();
        },
        updateConstantType: async (parent: any, args: GraphQLMutation) => {
            console.info('updateConstantType parent: ', parent, 'args: ',args);
            const where = new ConstantType(args.where);
            const updateData = new ConstantType(args.updateData)
            const command = CommandFactory.createUpdateConstantTypeCommand(where, updateData);
            return command.execute();
        },
        deleteConstantType: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteConstantType parent: ', parent, 'args: ',args);
            const deleteData = new ConstantType(args.deleteData);
            const command = CommandFactory.createDeleteConstantTypeCommand(deleteData);
            return command.execute();
        }
    }
}
