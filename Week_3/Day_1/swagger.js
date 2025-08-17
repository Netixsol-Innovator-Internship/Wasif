// const swaggerJSDoc = require("swagger-jsdoc");

// const swaggerDefinition = {
//   openapi: "3.0.0",
//   info: {
//     title: "Task Manager API",
//     version: "1.0.0",
//     description: "Task Manager API with Authentication (JWT)",
//   },
//   servers: [
//     {
//       url: "https://vercel.com/wasif-bin-nasirs-projects/task-manager-api/EhbpHBkpX8zhMGooG3H1m3GJKvju",
//       description: "Local server",
//     },
//   ],
//   components: {
//     schemas: {
//       Task: {
//         type: "object",
//         properties: {
//           id: { type: "integer", example: 1 },
//           title: { type: "string", example: "Learn Express" },
//           completed: { type: "boolean", example: false },
//         },
//       },
//       ApiResponse: {
//         type: "object",
//         properties: {
//           success: { type: "boolean", example: true },
//           data: {},
//           message: { type: "string", example: "Task created successfully" },
//         },
//       },
//       CreateTask: {
//         type: "object",
//         required: ["title"],
//         properties: {
//           title: { type: "string", example: "Learn Express" },
//           completed: { type: "boolean", example: false },
//         },
//       },
//       RegisterUser: {
//         type: "object",
//         required: ["name", "email", "password"],
//         properties: {
//           name: { type: "string", example: "John Doe" },
//           email: { type: "string", example: "john@example.com" },
//           password: { type: "string", example: "secret123" },
//         },
//       },
//       LoginUser: {
//         type: "object",
//         required: ["email", "password"],
//         properties: {
//           email: { type: "string", example: "john@example.com" },
//           password: { type: "string", example: "secret123" },
//         },
//       },
//       AuthResponse: {
//         type: "object",
//         properties: {
//           token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." },
//         },
//       },
//     },
//     securitySchemes: {
//       bearerAuth: {
//         type: "http",
//         scheme: "bearer",
//         bearerFormat: "JWT",
//       },
//     },
//   },
//   security: [{ bearerAuth: [] }],
//   paths: {
//     "/api/tasks": {
//       get: {
//         summary: "Get all tasks",
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             name: "title",
//             in: "query",
//             description: "Filter tasks by title substring",
//             required: false,
//             schema: { type: "string" },
//           },
//         ],
//         responses: {
//           200: {
//             description: "List of tasks",
//             content: {
//               "application/json": {
//                 schema: { $ref: "#/components/schemas/ApiResponse" },
//               },
//             },
//           },
//         },
//       },
//       post: {
//         summary: "Create a task",
//         security: [{ bearerAuth: [] }],
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: { $ref: "#/components/schemas/CreateTask" },
//             },
//           },
//         },
//         responses: {
//           201: {
//             description: "Task created",
//             content: {
//               "application/json": {
//                 schema: { $ref: "#/components/schemas/ApiResponse" },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/api/tasks/{id}": {
//       get: {
//         summary: "Get task by ID",
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             schema: { type: "integer" },
//           },
//         ],
//         responses: {
//           200: { description: "Task found" },
//           404: { description: "Task not found" },
//         },
//       },
//       put: {
//         summary: "Update a task",
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             schema: { type: "integer" },
//           },
//         ],
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: {
//                 type: "object",
//                 properties: {
//                   title: { type: "string" },
//                   completed: { type: "boolean" },
//                 },
//               },
//             },
//           },
//         },
//         responses: {
//           200: { description: "Task updated" },
//         },
//       },
//       delete: {
//         summary: "Delete a task",
//         security: [{ bearerAuth: [] }],
//         parameters: [
//           {
//             name: "id",
//             in: "path",
//             required: true,
//             schema: { type: "integer" },
//           },
//         ],
//         responses: {
//           200: { description: "Task deleted" },
//         },
//       },
//     },
//     "/api/tasks/stats": {
//       get: {
//         summary: "Get task statistics",
//         security: [{ bearerAuth: [] }],
//         responses: {
//           200: { description: "Stats retrieved successfully" },
//         },
//       },
//     },
//     "/api/users/register": {
//       post: {
//         summary: "Register a new user",
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: { $ref: "#/components/schemas/RegisterUser" },
//             },
//           },
//         },
//         responses: {
//           201: {
//             description: "User registered successfully",
//             content: {
//               "application/json": {
//                 schema: { $ref: "#/components/schemas/AuthResponse" },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/api/users/login": {
//       post: {
//         summary: "Login a user",
//         requestBody: {
//           required: true,
//           content: {
//             "application/json": {
//               schema: { $ref: "#/components/schemas/LoginUser" },
//             },
//           },
//         },
//         responses: {
//           200: {
//             description: "Login successful",
//             content: {
//               "application/json": {
//                 schema: { $ref: "#/components/schemas/AuthResponse" },
//               },
//             },
//           },
//           400: { description: "Invalid credentials" },
//         },
//       },
//     },
//   },
// };

// const options = {
//   definition: swaggerDefinition,
//   apis: [],
// };

// module.exports = swaggerJSDoc(options);

const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description: "In-memory Task Manager API",
  },
  servers: [
    {
      url: "https://mongo-three-swart.vercel.app",
      description: "Vercel server",
    },
  ],
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          title: { type: "string", example: "Learn Express" },
          completed: { type: "boolean", example: false },
        },
      },
      ApiResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {},
          message: { type: "string", example: "Task created successfully" },
        },
      },
      CreateTask: {
        type: "object",
        required: ["title"],
        properties: {
          title: { type: "string", example: "Learn Express" },
          completed: { type: "boolean", example: false },
        },
      },
    },
  },
  paths: {
    "/api/tasks": {
      get: {
        summary: "Get all tasks",
        parameters: [
          {
            name: "title",
            in: "query",
            description: "Filter tasks by title substring",
            required: false,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "List of tasks",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
                example: {
                  success: true,
                  data: [{ id: 1, title: "Learn Express", completed: false }],
                  message: "Tasks retrieved successfully",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a task",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateTask" },
              example: { title: "Learn Swagger", completed: false },
            },
          },
        },
        responses: {
          201: {
            description: "Task created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
                example: {
                  success: true,
                  data: { id: 2, title: "Learn Swagger", completed: false },
                  message: "Task created successfully",
                },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                example: {
                  success: false,
                  data: null,
                  message: "Validation error ...",
                },
              },
            },
          },
        },
      },
    },

    "/api/tasks/{id}": {
      get: {
        summary: "Get task by id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
              },
            },
          },
          404: {
            content: {
              "application/json": {
                example: {
                  success: false,
                  data: null,
                  message: "Task not found",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update a task",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  completed: { type: "boolean" },
                },
              },
              example: { title: "Learn Express.js deeply", completed: true },
            },
          },
        },
        responses: {
          200: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ApiResponse" },
              },
            },
          },
          400: {
            content: {
              "application/json": {
                example: {
                  success: false,
                  data: null,
                  message: "Validation error",
                },
              },
            },
          },
          404: {
            content: {
              "application/json": {
                example: {
                  success: false,
                  data: null,
                  message: "Task not found",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a task",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            content: {
              "application/json": {
                example: {
                  success: true,
                  data: { id: 1, title: "x", completed: false },
                  message: "Task deleted successfully",
                },
              },
            },
          },
          404: {
            content: {
              "application/json": {
                example: {
                  success: false,
                  data: null,
                  message: "Task not found",
                },
              },
            },
          },
        },
      },
    },

    "/api/tasks/stats": {
      get: {
        summary: "Get basic stats",
        responses: {
          200: {
            description: "Stats",
            content: {
              "application/json": {
                example: {
                  success: true,
                  data: { total: 3, completed: 1, pending: 2 },
                  message: "Stats retrieved successfully",
                },
              },
            },
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [],
};

module.exports = swaggerJSDoc(options);
