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
      Log: {
        type: 'object',
        properties: {
          log_id: {
            type: 'integer',
            description: 'The auto-generated id of the log entry'
          },
          team_id: {
            type: 'integer',
            description: 'ID of the team related to the log entry'
          },
          student_id: {
            type: 'integer',
            description: 'ID of the student related to the log entry'
          },
          points: {
            type: 'integer',
            description: 'Points involved in the log entry'
          },
          reason: {
            type: 'string',
            description: 'Reason or description of the log entry'
          }
        }
      },
      Student: {
        type: 'object',
        properties: {
          student_id: {
            type: 'integer',
            description: 'The auto-generated id of the student'
          },
          team_id: {
            type: 'integer',
            description: 'The ID of the team the student belongs to'
          },
          name: {
            type: 'string',
            description: 'The name of the student'
          },
          email: {
            type: 'string',
            description: 'The email of the student'
          },
          points: {
            type: 'integer',
            description: 'Points associated with the student'
          }
        },
        required: ['name', 'email', 'points']
      },
      Points: {
        type: 'object',
        properties: {
          team_id: {
            type: 'integer',
            description: 'The ID of the team'
          },
          points: {
            type: 'integer',
            description: 'The total points associated with the team'
          }
        }
      },
      CsvFormart: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the student or team member'
          },
          email: {
            type: 'string',
            description: 'The email of the student or team member'
          },
          name_team: {
            type: 'string',
            description: 'The name of the team'
          },
          color: {
            type: 'string',
            description: 'The color associated with the team'
          },
          points: {
            type: 'integer',
            description: 'The points to be allocated'
          }
        },
        required: ['name_team', 'color', 'points']
      }
    }
  }
};

module.exports = swaggerDefinition;
