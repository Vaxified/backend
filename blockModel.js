// contactModel.js
var mongoose = require("mongoose");
// Setup schema
var contactSchema = mongoose.Schema({
  name: {
    type: String,
  },
  index: {
    type: Number,
  },
  date:{
      type: Object,
  },
  previousHash: {
    type: String,
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
