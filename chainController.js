// contactController.js
// Import contact model
const SHA256 = require('crypto-js/sha256');
const express = require('express');
Blockchain = require("./blockModel");
// Handle index actions
exports.index = function (req, res) {
  Blockchain.get(function (err, blocks) {
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
  chain = await Blockchain.find({});
  chainLenght = Object.keys(chain).length;
  previousHash = (chain[chainLenght-1] != null? chain[chainLenght-1].hash: "")
  console.log(previousHash)
  

  

  var block = new Blockchain();
  block.name = req.body.name;
  block.index = req.body.index;
  block.date = req.body.date
  block.previousHash = previousHash;
  block.hash = ()=>{
      return SHA256(block.name + block.index + block.date).toString();
  }
  // save the contact and check for errors
  block.save(function (err) {
    res.json({
      data: block,
    });
  });
};

exports.delete = function(req, res){
  Blockchain.collection.remove({})
}

