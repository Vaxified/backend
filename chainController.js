// contactController.js
// Import contact model
const SHA256 = require("crypto-js/sha256");
const express = require("express");
Blockchain = require("./blockModel");
// Handle index actions

let calculateHash = (index, previousHash, doses, name, password) => {
  return SHA256(index + previousHash + name + JSON.stringify(doses) + password).toString();
};

exports.index = function (req, res) {
  let chainValidity;
  Blockchain.get(function (err, blocks) {
    for (i = 1; i < blocks.length; i++) {
      const currentBlock = blocks[i];
      const previousBlock = blocks[i - 1];
      if (
        currentBlock.hash !==
        calculateHash(
          currentBlock.index,
          currentBlock.previousHash,
          currentBlock.doses,
          currentBlock.name,
          currentBlock.password
        )
      ) {
        chainValidity = false;
      } else if (currentBlock.previousHash !== previousBlock.hash) {
        chainValidity = false;
      }
    }
    chainValidity = (chainValidity == false) ? false : true;

    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    } else if ((chainValidity == false)) {
      res.json({
        message: "The chain has been corrupted",
      });
    } else {
      res.json({
        data: blocks,
      });
    }
  });
};

// Handle create contact actions
exports.new = async function (req, res) {
  chain = await Blockchain.find({});
  chainLength = Object.keys(chain).length;
  previousHash =
    chain[chainLength - 1] != null ? chain[chainLength - 1].hash : "";

  var block = new Blockchain();
  block.name = req.body.name;
  block.index = chainLength;
  block.doses = req.body.doses;
  block.dob = req.body.dob;
  block.product = req.body.product;
  block.password = req.body.password;
  block.patientNumber = req.body.patientNumber;
  
  block.previousHash = previousHash;
  block.hash = calculateHash(
    block.index,
    block.previousHash,
    block.doses,
    block.name,
    block.password
  );
  // save the contact and check for errors
  block.save(function (err) {
    res.json({
      data: block,
    });
  });
};

exports.delete = function (req, res) {
  Blockchain.collection.remove({});
};
