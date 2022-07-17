require('dotenv').config();

require('./database');

const {
  app
} = require('./app');

const PORT = process.env.PORT;
app.listen(PORT);
console.log("listen server on port " + PORT);