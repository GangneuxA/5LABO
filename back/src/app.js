const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const route = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API gpt interface',
      version: '1.0.0',
      description: 'api gateway gpt interface',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:3010', 
        description: 'Serveur local',
      },
    ],
  },
  apis: ['src/routes/index.js'], 
};

const specs = swaggerJsdoc(options);
var app = express();
//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

app.use('/', route);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});