const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  img: {
    data: Buffer, 
    contentType: String 
  },
  title: String,
  date: String,
  description: String,  
  link: String
});

module.exports = mongoose.model('Event', eventSchema);
