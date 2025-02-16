import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  getTodos: async (_, { input }, { prisma }) => {
    if (input != null) {
      const { completed, page, limit, sortOrder } = input;
      const pageNumber = page ?? 1;
      const limitNumber = limit ?? 10;
      const order = sortOrder === "desc" ? "desc" : "asc";
  
      const todos = await prisma.todo.findMany({
        where: completed != null ? { completed } : {},
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
        orderBy: {
          createdAt: order,
        },
      });
  
      return todos.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      }));
    }
  
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  
    return todos.map((todo) => ({
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
