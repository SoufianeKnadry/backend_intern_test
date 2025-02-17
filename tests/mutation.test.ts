import { expect } from "chai";
import request from "supertest";
import { app } from "../src/app"; // Your Express app

describe("GraphQL createTodo Mutation", () => {
  it("should create a new todo", async () => {
    const query = `
      mutation CreateTodo($input: CreateTodoInput!) {
        createTodo(input: $input) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;

    const variables = {
      input: {
        title: "Test Todo",
      },
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables })
      .expect(200);

    // Ensure the response contains the expected values
    const newTodo = response.body.data.createTodo;
    expect(newTodo).to.have.property("id");
    expect(newTodo.title).to.equal("Test Todo");
    expect(newTodo.completed).to.equal(false);
    expect(newTodo.createdAt).to.be.a("string");
    expect(newTodo.updatedAt).to.be.a("string");
  });

  it("should return an error when no title is provided", async () => {
    const query = `
      mutation CreateTodo($input: CreateTodoInput!) {
        createTodo(input: $input) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;

    const variables = {
      input: {
        title: "", 
      },
    };

    const response = await request(app)
      .post("/graphql")
      .send({ query, variables })
    expect(response.body.errors[0].message).to.include("Unexpected error");
  });
});
