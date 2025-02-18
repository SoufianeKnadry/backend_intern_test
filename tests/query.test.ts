import { expect } from "chai";
import request from "supertest";
import { app } from "../src/app";

describe("GraphQL getTodos", () => {
  // Test: Fetch all todos when no input is provided (input is null)
  it("should fetch all todos when input is null", async () => {
    const query = `
      query {
        getTodos(input: null) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;

    const response = await request(app)
      .post("/graphql")
      .send({ query })
      .expect(200);

    expect(response.body.data).to.have.property("getTodos");
    expect(response.body.data.getTodos).to.be.an("array");
  });

  // Test: Fetch todos with input filtering for completed: false
  it("should fetch only todos with completed set to false", async () => {
    const query = `
      query GetTodos($completed: Boolean, $page: Int, $limit: Int, $sortOrder: String) {
        getTodos(input: { completed: $completed, page: $page, limit: $limit, sortOrder: $sortOrder }) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;
    const variables = {
      completed: false,
      page: 1,
      limit: 10,
      sortOrder: "asc",
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables })
      .expect(200);

    const todos = response.body.data.getTodos;
    expect(todos).to.be.an("array");
    todos.forEach((todo: { completed: boolean }) => {
      expect(todo.completed).to.equal(false);
    });
  });

  // Test: Fetch todos with input filtering for completed: true
  it("should fetch only todos with completed set to true", async () => {
    const query = `
      query GetTodos($completed: Boolean, $page: Int, $limit: Int, $sortOrder: String) {
        getTodos(input: { completed: $completed, page: $page, limit: $limit, sortOrder: $sortOrder }) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;
    const variables = {
      completed: true,
      page: 1,
      limit: 10,
      sortOrder: "asc",
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables })
      .expect(200);

    const todos = response.body.data.getTodos;
    expect(todos).to.be.an("array");
    todos.forEach((todo: { completed: boolean }) => {
      expect(todo.completed).to.equal(true);
    });
  });

  // Test: Verify that todos are sorted in ascending order by createdAt
  it("should fetch todos sorted in ascending order by createdAt", async () => {
    const query = `
      query GetTodos($completed: Boolean, $page: Int, $limit: Int, $sortOrder: String) {
        getTodos(input: { completed: $completed, page: $page, limit: $limit, sortOrder: $sortOrder }) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;
    const variables = {
      completed: false,
      page: 1,
      limit: 10,
      sortOrder: "asc",
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables })
      .expect(200);

    const todos = response.body.data.getTodos;
    expect(todos).to.be.an("array");
    for (let i = 1; i < todos.length; i++) {
      const prev = new Date(todos[i - 1].createdAt);
      const curr = new Date(todos[i].createdAt);
      expect(prev.getTime()).to.be.at.most(curr.getTime());
    }
  });

  // Test: Verify that todos are sorted in descending order by createdAt
  it("should fetch todos sorted in descending order by createdAt", async () => {
    const query = `
       query GetTodos($completed: Boolean, $page: Int, $limit: Int, $sortOrder: String) {
        getTodos(input: { completed: $completed, page: $page, limit: $limit, sortOrder: $sortOrder }) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;
    const variables = {
      completed: false,
      page: 1,
      limit: 10,
      sortOrder: "desc",
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables })
      .expect(200);

    const todos = response.body.data.getTodos;
    expect(todos).to.be.an("array");
    for (let i = 1; i < todos.length; i++) {
      const prev = new Date(todos[i - 1].createdAt);
      const curr = new Date(todos[i].createdAt);
      expect(prev.getTime()).to.be.at.least(curr.getTime());
    }
  });

  // Test: Verify that pagination works by comparing results from two different pages
  it("should fetch different todos for different pages", async () => {
    const query = `
       query GetTodos($completed: Boolean, $page: Int, $limit: Int, $sortOrder: String) {
        getTodos(input: { completed: $completed, page: $page, limit: $limit, sortOrder: $sortOrder }) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;
    const variablesPage1 = {
      completed: false,
      page: 1,
      limit: 2,
      sortOrder: "asc",
    };
    const variablesPage2 = {
      completed: false,
      page: 2,
      limit: 2,
      sortOrder: "asc",
    };

    const responsePage1 = await request(app)
      .post("/graphql")
      .send({ query, variables: variablesPage1 })
      .expect(200);

    const responsePage2 = await request(app)
      .post("/graphql")
      .send({ query, variables: variablesPage2 })
      .expect(200);

    const todosPage1 = responsePage1.body.data.getTodos;
    const todosPage2 = responsePage2.body.data.getTodos;
    expect(todosPage1).to.be.an("array");
    expect(todosPage2).to.be.an("array");
    if (todosPage1.length && todosPage2.length) {
      expect(todosPage1[0].id).to.not.equal(todosPage2[0].id);
    }
  });
});
