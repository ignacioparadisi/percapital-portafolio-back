import { ConstantType } from '@Common/entities/ConstantType';
import { ConstantValue } from '@Common/entities/ConstantValue';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const TypeValueResolver = {
    Query: {
        getTypeValues: async (parent: any, args: GraphQLQuery) => {
            console.info('getTypeValues parent:', parent, 'args: ',args);
            const where = new ConstantValue(args.where as ConstantValue)
            return null;
        }
    },
    TypeValue: {
        constantType: async (parent: ConstantValue, args: GraphQLQuery) => {
            console.info('constantType parent: ', parent, 'args: ',args)
            const where = new ConstantType(args.where as ConstantType);
            return null;
        },
    },
    Mutation: {
        createTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('createTypeValue parent: ', parent, 'args: ',args);
            const createData = new ConstantValue(args.insertData as ConstantValue);
            return null;
        },
        updateTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('updateTypeValue parent: ', parent, 'args: ',args);
            const where = new ConstantValue(args.where as ConstantValue);
            const updateData = new ConstantValue(args.updateData as ConstantValue);
            return null;
        },
        deleteTypeValue: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteTypeValue parent: ', parent, 'args: ',args);
            const deleteData = new ConstantValue(args.deleteData as ConstantValue);
            return null;
        }
    }
}
