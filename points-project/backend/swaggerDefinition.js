const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'EpiPool API',
      version: '1.0.0',
      description: 'API documentation for EpiPool',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Team: {
          type: 'object',
          properties: {
            team_id: {
              type: 'integer',
              description: 'The unique ID of the team',
            },
            name: {
              type: 'string',
              description: 'The name of the team',
            },
            color: {
              type: 'string',
              description: 'The color associated with the team',
            },
          },
          required: ['name', 'color'],
        },
      },
    },
  };
  
  module.exports = swaggerDefinition;
  