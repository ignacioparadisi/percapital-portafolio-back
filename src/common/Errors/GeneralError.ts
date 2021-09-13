import { ApolloError } from 'apollo-server';

export class GeneralError extends ApolloError {
  constructor(message: string, public innerError?: Error | unknown, code?: string) {
    super(message, code || 'INTERNAL_SERVER_ERROR');
  }
}