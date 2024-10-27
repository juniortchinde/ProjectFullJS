const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !'+err));
 
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/public',express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//refresh token
app.get('/', require('./controllers/refreshToken').refreshToken);
app.delete('/', require('./controllers/refreshToken').logout)

app.use('/api/user', require('./routes/User.routes'))
app.use('/api/product', require('./routes/Product.routes'))


module.exports = app;