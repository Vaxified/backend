// api-routes.js
// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to Vaxified!",
  });
});
// Import contact controller
var contactController = require("./chainController");
// Contact routes
router
  .route("/adddata")
  .post(contactController.new)
  .delete(contactController.delete)
router.route("/getdata").get(contactController.index);
// Export API routes
module.exports = router;
