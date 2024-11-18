const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Real Estate Platform API',
            version: '1.0.0',
            description: 'API documentation for the Real Estate Platform',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Replace with your actual URL or environment variable
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // JWT format for Bearer authentication
                },
            },
        },
        security: [
            {
                BearerAuth: [], // Applying the Bearer token security globally to all routes
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your route files for swagger annotations
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
