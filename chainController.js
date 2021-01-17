// contactController.js
// Import contact model
const SHA256 = require('crypto-js/sha256');
const express = require('express');
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
      message:"contacts found"
    });
  });
};

// Handle create contact actions
exports.new = async function (req, res)  {
  chain = await Block.find({});
  chainLenght = Object.keys(chain).length;
  previousHash = (chain[chainLenght-1] != null? chain[chainLenght-1].hash: "")
  console.log(chain)
  

  

  var block = new Block();
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


