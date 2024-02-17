require('dotenv').config();
const path = require('path');
const cors = require('cors')
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");

app.use(express.json());
app.set("json spaces", 2);
app.use(cors());

// Controllers
const { 
  getWallets, 
  getWalletTokens, 
  getWalletTransactions, 
} = require('./api/wallet.controller');

// API ROUTES
app.get('/api/wallets', getWallets);
app.get('/api/wallet/:wallet/tokens', getWalletTokens);
app.get('/api/wallet/:wallet/transactions', getWalletTransactions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);
app.use(notFoundHandler);

// Remove X-Frame-Options to allow for rendering in an Iframe
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  next();
});

// Logs every incoming HTTP requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} over ${req.protocol}`);
  next();
});

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Catch any promise rejections
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ' + p + ' reason: ' + reason);
});

// Serve the app
app.listen(PORT, () => {
  console.log('Server running at port:' + PORT);
});

const functions = require("firebase-functions");

exports.api_cointail_production = functions.https.onRequest(app);