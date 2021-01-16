// contactController.js
// Import contact model
Block = require('./blockModel');
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
            status: "success",
            message: "Contacts retrieved successfully",
            data: blocks
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var block = new Block();
    block.name = req.body.name;
  block.index = req.body.index;
  block.firstVaxDate = req.body.firstVaxDate;
  block.secondVaxDate = req.body.secondVaxDate;
  block.previousHash = req.body.previousHash;
// save the contact and check for errors
    block.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New contact created!',
            data: block
        });
    });
};

