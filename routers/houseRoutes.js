const express = require("express");
const {
  addHouse,
  getHouse,
  findHouse,
  updateHouse,
  deleteHouse,
} = require("../controller/HouseController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
//routes
router.post("/", addHouse);
router.get("/", getHouse);
router.get("/:id", findHouse);
router.put("/:id", updateHouse);
router.delete("/:id", deleteHouse);

module.exports = router;
