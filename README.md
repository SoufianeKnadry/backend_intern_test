
# LUDEX INTERNSHIP TEST

# Todo GraphQL API

Every task and bonus feature is completed.
Bellow you will find all the graphql queries that you have access to with a brief explanation of what they do and their arguments.

## Queries & Mutations

### `getTodos(input: GetTodosInput): [Todo]!`

Fetches a list of Todos based on the provided filters. (Access to pagination)

#### Arguments:
- `input` (optional):
  - `completed` (Boolean): Filter Todos by completion status. 
  - `page` (Int, default: `1`): The page number to retrieve.
  - `limit` (Int, default: `10`): The number of Todos per page.
  - `sortOrder` (String, default: `"asc"`): Sort order of Todos. Can be `"asc"` or `"desc"`.
  - `dueFilter` (String, optional): Filter Todos based on due date. Options: `"overdue"` or `"upcoming"`.

#### Example Query:
```graphql
query {
  getTodos(input: { completed: false, sortOrder: "desc", dueFilter: "overdue", page: 1, limit: 5 }) {
    id
    title
    completed
    createdAt
    updatedAt
    dueDate
  }
}
```

---

### `getTodo(id: ID!): Todo`

Fetches a single Todo by its unique ID.

#### Arguments:
- `id` (ID): The unique identifier of the Todo.

#### Example Query:
```graphql
query {
  getTodo(id: "060a5806-5c91-4f25-8109-6deda8f70b55") {
    id
    title
    completed
    createdAt
    updatedAt
    dueDate
  }
}
```

---

## Mutations

### `createTodo(input: CreateTodoInput!): Todo!`

Creates a new Todo item.

#### Arguments:
- `input` (CreateTodoInput):
  - `title` (String): The title of the Todo (required).
  - `dueDate` (String, optional): The due date of the Todo. If not provided, it will be set to 1 day from the current date.

#### Example Mutation:
```graphql
mutation {
  createTodo(input: { title: "My New Todo", dueDate: "2025-02-20T12:00:00.000Z" }) {
    id
    title
    completed
    createdAt
    updatedAt
    dueDate
  }
}
```

---

### `updateTodo(input: UpdateTodoInput!): Todo!`

Updates an existing Todo item.

#### Arguments:
- `input` (UpdateTodoInput):
  - `id` (ID!): The unique identifier of the Todo (required).
  - `title` (String, optional): The title of the Todo.
  - `completed` (Boolean, optional): The completion status of the Todo.

#### Example Mutation:
```graphql
mutation {
  updateTodo(input: { id: "060a5806-5c91-4f25-8109-6deda8f70b55", title: "Updated Todo Title", completed: true }) {
    id
    title
    completed
    createdAt
    updatedAt
    dueDate
  }
}
```

---

### `deleteTodo(id: ID!): Boolean!`

Deletes a Todo item.

#### Arguments:
- `id` (ID!): The unique identifier of the Todo to be deleted.

#### Example Mutation:
```graphql
mutation {
  deleteTodo(id: "060a5806-5c91-4f25-8109-6deda8f70b55") 
}
```

---

## Tests

The API is tested using a test suite.

### Running the Tests

1. Navigate to the project root:
    ```bash
    cd <project-root>
2. Install dependencies
    ```bash
    npm install
3. Run the tests:
    ```bash
    npm test
