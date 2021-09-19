import {ConstantType} from '@Common/Entities/ConstantType';
import {ConstantValue} from '@Common/Entities/ConstantValue';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const TypeValueResolver = {
    Query: {
        getTypeValues: async (parent: any, args: GraphQLQuery) => {
            console.info('getTypeValues parent:', parent, 'args: ',args);
            const where = new ConstantValue(args.where)
            const command = CommandFactory.createGetTypeValuesCommand(where, args.limit, args.skip);
            return null;
        }
    },
    TypeValue: {
        constantType: async (parent: ConstantValue, args: GraphQLQuery) => {
            console.info('constantType parent: ', parent, 'args: ',args)
            const where = new ConstantType(args.where as ConstantType);
            const command = CommandFactory.createGetConstantTypeByTypeValueCommand(where, parent);
            return null;
        },
    },
    Mutation: {
        createTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('createTypeValue parent: ', parent, 'args: ',args);
            const createData = new ConstantValue(args.insertData);
            const command = CommandFactory.createCreateTypeValueCommand(createData);
            return null;
        },
        updateTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('updateTypeValue parent: ', parent, 'args: ',args);
            const where = new ConstantValue(args.where);
            const updateData = new ConstantValue(args.updateData)
            const command = CommandFactory.createUpdateTypeValueCommand(where, updateData);
            return null;
        },
        deleteTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteTypeValue parent: ', parent, 'args: ',args);
            const deleteData = new ConstantValue(args.deleteData);
            const command = CommandFactory.createDeleteTypeValueCommand(deleteData);
            return null;
        }
    }
}
