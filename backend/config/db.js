const mongosoe = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongosoe.connect('mongodb://127.0.0.1:27017/students');
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log('database error!'.red.underline.bold);
    console.log('database error is: ', error);
  }
};

module.exports = connectDB;
