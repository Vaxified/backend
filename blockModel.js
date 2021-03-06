// contactModel.js
var mongoose = require("mongoose");
// Setup schema
var contactSchema = mongoose.Schema({
  name: {
    type: String,
  },
  password:{
    type: String,
  },
  dob:{
      type: String
  },
  product:{
      type: String
  },
  patientNumber:{
      type: Number
  },
  index: {
    type: Number,
  },
  doses:{
      type: Object,
  },
  previousHash: {
    type: String,
  },
  hash:{
    type: String,
  }
});
// Export Contact model
var Block = (module.exports = mongoose.model("contact", contactSchema));
module.exports.get = function (callback, limit) {
  Block.find(callback).limit(limit);
};
