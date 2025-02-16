import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";

export const Mutation: IMutation<Context> = {
  createTodo: async (_, { input }, { prisma }) => {
    try {
      const newTodo = await prisma.todo.create({
        data: {
          title: input.title,
          completed: false,
        },
      });

      return {
        ...newTodo,
        createdAt: newTodo.createdAt.toISOString(),
        updatedAt: newTodo.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error creating todo:", error);
      throw new Error("Failed to create todo");
    }
  },

 
};
