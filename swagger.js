const swaggerAuto = require('swagger-autogen')

const swaggerAutogen = swaggerAuto()

const doc = {
  info: {
    title: 'Ms tv Ott',
    description: 'Description'
  },
  host: 'hrms-server-2p7z.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */


const GnerateSwaggerDocs = () => {
    swaggerAutogen(outputFile, routes, doc);
}

GnerateSwaggerDocs()








