import {ConstantType} from '@Common/Entities/ConstantType';
import {TypeValue} from '@Common/Entities/TypeValue';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const TypeValueResolver = {
    Query: {
        getTypeValues: async (parent: any, args: GraphQLQuery) => {
            console.info('getTypeValues parent:', parent, 'args: ',args);
            const where = new TypeValue(args.where)
            const command = CommandFactory.createGetTypeValuesCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    TypeValue: {
        constantType: async (parent: TypeValue, args: GraphQLQuery) => {
            console.info('constantType parent: ', parent, 'args: ',args)
            const where = new ConstantType(args.where);
            const command = CommandFactory.createGetConstantTypeByTypeValueCommand(where, parent);
            return command.execute();
        },
    },
    Mutation: {
        createTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('createTypeValue parent: ', parent, 'args: ',args);
            const createData = new TypeValue(args.insertData);
            const command = CommandFactory.createCreateTypeValueCommand(createData);
            return command.execute();
        },
        updateTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('updateTypeValue parent: ', parent, 'args: ',args);
            const where = new TypeValue(args.where);
            const updateData = new TypeValue(args.updateData)
            const command = CommandFactory.createUpdateTypeValueCommand(where, updateData);
            return command.execute();
        },
        deleteTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteTypeValue parent: ', parent, 'args: ',args);
            const deleteData = new TypeValue(args.deleteData);
            const command = CommandFactory.createDeleteTypeValueCommand(deleteData);
            return command.execute();
        }
    }
}
