require('dotenv').config();
const app = require('./app/server');

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port: ${process.env.SERVER_PORT}.`);
});
