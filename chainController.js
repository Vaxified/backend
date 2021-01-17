// contactController.js
// Import contact model
const SHA256 = require('crypto-js/sha256')
Block = require("./blockModel");
// Handle index actions
exports.index = function (req, res) {
  Block.get(function (err, blocks) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      data: blocks,
    });
  });
};
// Handle create contact actions
exports.new = async function (req, res)  {
  chain = await Block.find({});
  chainLenght = Object.keys(chain).length;
  previousHash = chain[chainLenght-1].hash

  var block = new Block();
  block.name = req.body.name;
  block.index = req.body.index;
  block.firstVaxDate = req.body.firstVaxDate;
  block.secondVaxDate = req.body.secondVaxDate;
  block.previousHash = previousHash;
//   block.hash = ()=>{
//       return 
//   }
  
  // save the contact and check for errors
  block.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: "New contact created!",
      data: block,
    });
  });
};
