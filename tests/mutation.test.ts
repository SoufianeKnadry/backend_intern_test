import { expect } from "chai";
import request from "supertest";
import { app } from "../src/app"; 

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

  it("should create and update a todo successfully", async () => {
    const createTodoQuery = `
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
  
    const createVariables = {
      input: {
        title: "Test Todo",
      },
    };
  
    const createResponse = await request(app)
      .post("/graphql")
      .send({ query: createTodoQuery, variables: createVariables })
      .expect(200);
  
    const newTodo = createResponse.body.data.createTodo;
    const todoId = newTodo.id; 
  
    const updateTodoQuery = `
      mutation updateTodo($input: UpdateTodoInput!) {
        updateTodo(input: $input) {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    `;
  
    const updateInput = {
      id: todoId,  
      title: "Updated Todo Title",
      completed: true,
    };
  
    const updateResponse = await request(app)
      .post("/graphql")
      .send({
        query: updateTodoQuery,
        variables: { input: updateInput },
      })
      .expect(200);
  
    const updatedTodo = updateResponse.body.data.updateTodo;
    expect(updatedTodo).to.have.property("id");
    expect(updatedTodo.title).to.equal(updateInput.title);
    expect(updatedTodo.completed).to.equal(updateInput.completed);
  });
  
});
