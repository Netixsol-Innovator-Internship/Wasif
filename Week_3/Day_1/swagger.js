
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'In-memory Task Manager API'
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local server' }
  ],
  components: {
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Learn Express' },
          completed: { type: 'boolean', example: false }
        }
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: { },
          message: { type: 'string', example: 'Task created successfully' }
        }
      },
      CreateTask: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string', example: 'Learn Express' },
          completed: { type: 'boolean', example: false }
        }
      }
    }
  },
  paths: {
    '/api/tasks': {
      get: {
        summary: 'Get all tasks',
        parameters: [
          {
            name: 'title',
            in: 'query',
            description: 'Filter tasks by title substring',
            required: false,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'List of tasks',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
                example: {
                  success: true,
                  data: [
                    { id: 1, title: 'Learn Express', completed: false }
                  ],
                  message: 'Tasks retrieved successfully'
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a task',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateTask' },
              example: { title: 'Learn Swagger', completed: false }
            }
          }
        },
        responses: {
          '201': {
            description: 'Task created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ApiResponse' },
                example: {
                  success: true,
                  data: { id: 2, title: 'Learn Swagger', completed: false },
                  message: 'Task created successfully'
                }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: { 'application/json': { example: { success: false, data: null, message: "Validation error ..." } } }
          }
        }
      }
    },

    '/api/tasks/{id}': {
      get: {
        summary: 'Get task by id',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' }}],
        responses: {
          '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          '404': { content: { 'application/json': { example: { success: false, data: null, message: 'Task not found' } } } }
        }
      },
      put: {
        summary: 'Update a task',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { type: 'object', properties: { title: { type: 'string' }, completed: { type: 'boolean' } } },
              example: { title: 'Learn Express.js deeply', completed: true }
            }
          }
        },
        responses: {
          '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          '400': { content: { 'application/json': { example: { success: false, data: null, message: 'Validation error' } } } },
          '404': { content: { 'application/json': { example: { success: false, data: null, message: 'Task not found' } } } }
        }
      },
      delete: {
        summary: 'Delete a task',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { content: { 'application/json': { example: { success: true, data: { id: 1, title: 'x', completed: false }, message: 'Task deleted successfully' } } } },
          '404': { content: { 'application/json': { example: { success: false, data: null, message: 'Task not found' } } } }
        }
      }
    },

    '/api/tasks/stats': {
      get: {
        summary: 'Get basic stats',
        responses: {
          '200': {
            description: 'Stats',
            content: {
              'application/json': { example: { success: true, data: { total: 3, completed: 1, pending: 2 }, message: 'Stats retrieved successfully' } }
            }
          }
        }
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: []
};

module.exports = swaggerJSDoc(options);
