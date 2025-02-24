import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";

export const Mutation: IMutation<Context> = {
  createTodo: async (_, { input }, { prisma }) => {
    try {
      if (!input.title || input.title.trim() === "") {
        throw new Error("Title is required to create a todo");
      }

      // If the dueDate is not provided, set it to now plus 1 day
      const dueDate = input.dueDate
        ? new Date(input.dueDate)
        : new Date(new Date().setDate(new Date().getDate() + 1));

      const newTodo = await prisma.todo.create({
        data: {
          title: input.title,
          completed: false,
          dueDate: dueDate,
        },
      });

      return {
        ...newTodo,
        createdAt: newTodo.createdAt.toISOString(),
        updatedAt: newTodo.updatedAt.toISOString(),
        dueDate: newTodo.dueDate.toISOString(),
      };
    } catch (error) {
      console.error("Error creating todo:", error);
      throw new Error("Failed to create todo");
    }
  },

  updateTodo: async (_, { input }, { prisma }) => {
    const { id, title, completed } = input;

    // Prepare the data object for Prisma
    const data: { title?: string; completed?: boolean } = {};
    if (title != null) {
      data.title = title;
    }
    if (completed != null) {
      data.completed = completed;
    }
    try {
      // Send the data object
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data,
      });
      return {
        ...updatedTodo,
        createdAt: updatedTodo.createdAt.toISOString(),
        updatedAt: updatedTodo.updatedAt.toISOString(),
        dueDate: updatedTodo.dueDate.toISOString(),
      };
    } catch (error) {
      console.error("Error updating todo:", error);
      throw new Error("Failed to update todo");
    }
  },
  deleteTodo: async (_, { id }, { prisma }) => {
    try {
      await prisma.todo.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      console.error("Error deleting todo:", error);
      return false;
    }
  },
};
