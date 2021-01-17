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

let calculateHash = (index,previousHash,date, name) =>{
  return SHA256(index + previousHash + name + JSON.stringify(date)).toString();
}

// Handle create contact actions
exports.new = async function (req, res)  {
  chain = await Blockchain.find({});
  chainLenght = Object.keys(chain).length;
  previousHash = (chain[chainLenght-1] != null? chain[chainLenght-1].hash: "")

  

  

  var block = new Blockchain();
  block.name = req.body.name;
  block.index = chainLenght;
  block.date = req.body.date
  block.previousHash = previousHash;
  block.hash = calculateHash(block.index,block.previousHash,block.date, block.name)
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

