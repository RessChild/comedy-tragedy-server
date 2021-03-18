import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'localhost:3300',
        basePath: '/'
    },
    apis: ["../router/*.js"],
};

module.exports = swaggerJSDoc(options);