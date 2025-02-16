import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  getTodos: async (_, __, { prisma }) => {
    const todos = await prisma.todo.findMany();
    
    return todos.map(todo => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),  
      updatedAt: todo.updatedAt.toISOString(), 
    }));
  },

  getTodo: async (_, { id }, { prisma }) => {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (todo) {
      return {
        ...todo,
        createdAt: todo.createdAt.toISOString(), 
        updatedAt: todo.updatedAt.toISOString(),  
      };
    }

    return null; 
  },
};
