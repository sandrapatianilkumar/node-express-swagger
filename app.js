const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyParser = require('body-parser');
const router = express.Router();


const port = process.env.PORT || 3000;

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: 'Customer API in the system',
            description: 'Customer API Information',
            contact: {
                name: 'NodeDeveloper',
                email: 'node@gmail.com'
            },
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT"
            },
            servers: ['http://localhost:3000'],
            tags: [{
                name: "Customer",
                description: "API for customer in the system"
            }],
        }
    },
    //['.routes/*.js] - it considers all routes
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //swaggerDocument
app.use('', router);
const getCustomer = (req, res) => {
    res.send('customers list...');
}

/**
 * @swagger
 * /getCustomer:
 *  get:
 *   description: Use to request all customers
 *   summary: Get customer in system
 *   responses:
 *    '200':
 *      description: A successful response
 */
router.route('/getCustomer').get(getCustomer);

app.listen(port, () => {
    console.log(`Server listening on port ${port} `)
});