const mongoose = require('mongoose');

exports.connectToDB = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;
  // mongoose.set('debug', true);
  // if(process.env.NODE_ENV === 'production')
  let connectionString;
  if (DB_USER && DB_PASSWORD) {
    connectionString=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
  } else {
    connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }

  console.log(`Connecting to ${connectionString}`);
  mongoose.set('useFindAndModify', false);
  const db = mongoose.connection;
  db.on('connected', () => {
    console.log('DB connected');
  });
  db.on('error', (error) => {
    console.log('DB connection failed');
    console.error(error.message);
    process.exit(1);
  });
  db.on('disconnected', () => {
    console.log('mongoose connection is disconnected');
  });

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
