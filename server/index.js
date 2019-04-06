const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoUrl = 'mongodb://admin:admin123@ds137763.mlab.com:37763/react-basic';

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

mongoose.set('debug', true);

// create express app
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// define a simple route
app.get('/', (_, res) => {
  res.status(200).send('ok');
});

require('./routes')(app);

// listen for requests
app.listen(9090, () => {
  console.log('Server is listening on port 9090');
});
