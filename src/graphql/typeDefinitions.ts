export const typeDefs = /* GraphQL */ `
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
    dueDate: String
  }

  input CreateTodoInput {
    title: String!
    dueDate: String
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    completed: Boolean
  }

  input GetTodosInput {
    completed: Boolean
    page: Int = 1
    limit: Int = 10
    sortOrder: String = "asc"
    dueFilter: String
  }

  type Query {
    getTodos(input: GetTodosInput): [Todo]!
    getTodo(id: ID!): Todo
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;
