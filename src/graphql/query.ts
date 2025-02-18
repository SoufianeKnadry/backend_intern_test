import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";
import { Prisma } from "@prisma/client";


export const Query: IQuery<Context> = {
  getTodos: async (_, { input }, { prisma }) => {
    // If input is undefined or null, return all todos
    const { completed, page, limit, sortOrder, dueFilter } = input ?? {};
    const pageNumber = page ?? 1;
    const limitNumber = limit ?? 10;
    const order = sortOrder === "desc" ? "desc" : "asc";

    // Build the where clause dynamically based on provided filters
    const sanitizedCompleted = completed ?? undefined;
    const sanitizedDueFilter = dueFilter ?? undefined;
    const whereClause = buildWhereClause(
      sanitizedCompleted,
      sanitizedDueFilter,
    );
    const todos = await prisma.todo.findMany({
      where: whereClause,
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
      orderBy: { createdAt: order },
    });

    return todos.map((todo) => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
      dueDate: todo.dueDate.toISOString(),
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
        dueDate: todo.dueDate.toISOString(),
      };
    }

    return null;
  },
};

// Helper function

const buildWhereClause = (
  completed?: boolean,
  dueFilter?: string,
): Prisma.TodoWhereInput => {
  const now = new Date();
  const adjustedNow = new Date(now.toISOString());

  const whereClause: Prisma.TodoWhereInput = {};

  if (completed !== undefined) {
    whereClause.completed = completed;
  }

  if (dueFilter === "overdue") {
    whereClause.dueDate = { lt: adjustedNow };
  } else if (dueFilter === "upcoming") {
    whereClause.dueDate = { gte: adjustedNow };
  }

  return whereClause;
};
