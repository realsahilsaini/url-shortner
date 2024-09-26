const mongoose = require('mongoose');

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
}


module.exports = {
  connectToMongoDB
};