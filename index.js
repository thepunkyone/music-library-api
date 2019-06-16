const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true }, () => {
  console.log('Tests running on 3000');
  app.listen(3000);
});
