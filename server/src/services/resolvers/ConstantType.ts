import { ConstantValue } from '@Common/entities/ConstantValue';
import { ConstantType } from '@Common/entities/ConstantType';
import { CommandFactory } from '@Logic/commands/CommandFactory';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';
import { ExecutionContext } from 'graphql/execution/execute';
import { ConstantCommandFactory } from '@Logic/commands/constants/ConstantCommandFactory';

export const ConstantTypeResolver = {
    Query: {
        getConstantTypes: async (parent: any, args: GraphQLQuery, context: ExecutionContext) => {
            console.info('getConstantTypes parent:', parent, 'args: ',args);
            const where = new ConstantType(args.where as ConstantType)
            const command = ConstantCommandFactory.createGetConstantTypeCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    ConstantType: {
        values: async (parent: ConstantType, args: GraphQLQuery) => {
            console.info('Constant Values parent: ', parent, 'args: ',args)
            const where = new ConstantValue(args.where as ConstantValue);
            where.constantTypeId = parent.id;
            const command = ConstantCommandFactory.createGetConstantValueCommand(where, args.limit);
            return command.execute();
        },
    },
    Mutation: {
        updateConstantType: async (parent: any, args: GraphQLMutation) => {
            console.info('updateConstantType parent: ', parent, 'args: ',args);
            const where = new ConstantType(args.where as ConstantType);
            const updateData = new ConstantType(args.updateData as ConstantType)
            return null;
        },
        deleteConstantType: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteConstantType parent: ', parent, 'args: ',args);
            const deleteData = new ConstantType(args.deleteData as ConstantType);
            return null;
        }
    }
}
