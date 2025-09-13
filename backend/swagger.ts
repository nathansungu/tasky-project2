export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasky Project API',
      version: '1.0.0',
      description: 'A Tasky PRoject To Organize Work Flow',
    },
  },
  apis: ['src/routes/*.ts'], 
};