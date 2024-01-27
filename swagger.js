// const swaggerAutogen = require('swagger-autogen')();
import swaggerAutogen from 'swagger-autogen';


const doc = {
  info: {
    version: '1.0',            // by default: '1.0.0'
    title: 'Chat appliation',              // by default: 'REST API'
    description: 'Chat application'         // by default: ''
  },
  host: 'localhost:8080',                 // by default: 'localhost:3000'        // by default: '/'
basePath: '/api',                     // by default: '/'
  tags: [                   // by default: empty Array
  {
    name: 'auth',             // Tag name
    description: 'Auth Routes'       // Tag description
  },
  {
    name: 'user',             // Tag name
    description: 'user Routes'       // Tag description
  },
    {
      name: 'chat',             // Tag name
      description: 'Chat routes'       // Tag description
    },
    {
      name: 'message',             // Tag name
      description: 'Message routes '       // Tag description
    },
  
  ],

  // bearer token
  securityDefinitions: {
    apiKeyAuth: {
      "type": "http",
      "scheme": "bearer",
      "bearerFormat": "JWT",
    },
    cookieAuth: {
      "type": "apiKey",
      "in": "cookie",
      "name": "JWT"
    }

  },  
};

const outputFile = './swagger-output.json';
const routes = ['./routes/chatRoutes.js', './routes/messageRoutes.js', './routes/userAuth.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);