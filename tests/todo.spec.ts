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

  
});
