/** OpenAPI 3 spec for the FE test backend, served via Swagger UI at /docs. */
export const openapiSpec = {
  openapi: "3.0.3",
  info: {
    title: "FE Test — Reference Backend",
    version: "1.0.0",
    description:
      "Auth + employees API for the FE intern test. In-memory store, JWT auth, no registration.\n\n" +
      "**Seeded logins:** `admin@example.com / admin123` (admin), `employee@example.com / employee123` (employee).",
  },
  servers: [{ url: "http://localhost:4000", description: "Local dev" }],
  tags: [
    { name: "Auth", description: "Login / logout / session" },
    { name: "Employees", description: "Employee list, detail, create" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", example: "u1" },
          email: { type: "string", format: "email", example: "admin@example.com" },
          name: { type: "string", example: "Admin" },
          role: { type: "string", enum: ["admin", "employee"], example: "admin" },
        },
      },
      Employee: {
        type: "object",
        properties: {
          id: { type: "string", example: "e1" },
          name: { type: "string", example: "An Nguyen" },
          email: { type: "string", format: "email", example: "an.nguyen@example.com" },
          position: { type: "string", example: "Frontend Engineer" },
          department: { type: "string", example: "Engineering" },
          status: {
            type: "string",
            enum: ["active", "on_leave", "inactive"],
            example: "active",
          },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "admin@example.com" },
          password: { type: "string", example: "admin123" },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      CreateEmployeeRequest: {
        type: "object",
        required: ["name", "email", "position", "department"],
        properties: {
          name: { type: "string", example: "Test Person" },
          email: { type: "string", format: "email", example: "test.person@example.com" },
          position: { type: "string", example: "Intern" },
          department: { type: "string", example: "Engineering" },
          status: {
            type: "string",
            enum: ["active", "on_leave", "inactive"],
            example: "active",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string", example: "Dữ liệu không hợp lệ" },
          errors: {
            type: "object",
            additionalProperties: { type: "string" },
            example: { email: "Email không hợp lệ" },
          },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: "Missing / invalid token or bad credentials",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
      NotFound: {
        description: "Resource not found",
        content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
      },
    },
  },
  paths: {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Log in",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/LoginRequest" } },
          },
        },
        responses: {
          200: {
            description: "Token + user",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/LoginResponse" } },
            },
          },
          400: { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Log out (stateless — drop the token client-side)",
        responses: { 204: { description: "No content" } },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Current user (restore session)",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Wrapped user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { user: { $ref: "#/components/schemas/User" } },
                },
              },
            },
          },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
    },
    "/employees": {
      get: {
        tags: ["Employees"],
        summary: "List employees",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "search",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Case-insensitive filter on name / email / position / department",
          },
        ],
        responses: {
          200: {
            description: "Array of employees",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Employee" } },
              },
            },
          },
          401: { $ref: "#/components/responses/Unauthorized" },
        },
      },
      post: {
        tags: ["Employees"],
        summary: "Create an employee",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateEmployeeRequest" },
            },
          },
        },
        responses: {
          201: {
            description: "Created employee",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Employee" } },
            },
          },
          400: { description: "Validation error", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          401: { $ref: "#/components/responses/Unauthorized" },
          409: { description: "Duplicate email", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/employees/{id}": {
      get: {
        tags: ["Employees"],
        summary: "Employee detail",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" }, example: "e1" },
        ],
        responses: {
          200: {
            description: "Employee",
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/Employee" } },
            },
          },
          401: { $ref: "#/components/responses/Unauthorized" },
          404: { $ref: "#/components/responses/NotFound" },
        },
      },
    },
  },
}
