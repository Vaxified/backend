// contactModel.js
var mongoose = require("mongoose");
// Setup schema
var contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  firstVaxDate: {
    type: Date,
    default: Date.now,
  },
  secondVaxDate: {
    type: Date,
  },
  previousHash: {
    type: String,
    required: true,
  },
//   hash:{
//     type: String,
//     require: true,
//   }
});
// Export Contact model
var Block = (module.exports = mongoose.model("contact", contactSchema));
module.exports.get = function (callback, limit) {
  Block.find(callback).limit(limit);
};
