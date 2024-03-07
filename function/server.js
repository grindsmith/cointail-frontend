require('dotenv').config();
const path = require('path');
const cors = require('cors')
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccountKey = require('./cointail-7b094-firebase-adminsdk-3pysg-a82e3d1976.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

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
  getWallet,
  postWallet,
  getWalletTokens, 
  getWalletTransactions, 
} = require('./api/wallet.controller');

// API ROUTES
app.get('/api/wallets', getWallets);
app.get('/api/wallet/:wallet', getWallet);
app.post('/api/wallet', postWallet);
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
if (process.env.NODE_ENV === "local") {
  app.listen(PORT, () => {
    console.log('Server running at port:' + PORT);
  });
}

exports.api_cointail_production = functions.https.onRequest(app);