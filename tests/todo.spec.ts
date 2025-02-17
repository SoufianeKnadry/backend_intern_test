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
      sortOrder: "asc"
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables })
      .expect(200);

    const todos = response.body.data.getTodos;
    expect(todos).to.be.an("array");
    todos.forEach((todo: { completed: boolean }) => {
      return expect(todo.completed).to.be.false; 
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
      sortOrder: "asc"
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables })
      .expect(200);

    const todos = response.body.data.getTodos;
    expect(todos).to.be.an("array");
    todos.forEach((todo: { completed: boolean }) => {
      return expect(todo.completed).to.be.true;
    });
  });

  
});
