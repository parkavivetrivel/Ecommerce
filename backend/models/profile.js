const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },



  


});

module.exports = mongoose.model('Profile', profileSchema);
