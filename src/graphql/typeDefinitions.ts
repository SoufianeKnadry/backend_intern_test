export const typeDefs = /* GraphQL */ `
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
  }

  input CreateTodoInput {
    title: String!
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo!]!
    getTodo(id: ID!): Todo
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;
