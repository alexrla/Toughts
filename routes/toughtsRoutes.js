const express = require("express");

const ToughtController = require("../controllers/ToughtController");

// Helpers
const checkAuth = require("../helpers/auth").checkAuth;

const router = express.Router();

router.get("/add", checkAuth, ToughtController.createTought);
router.post("/add", checkAuth, ToughtController.createToughtSave);
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.post("/remove", checkAuth, ToughtController.removeTought);
router.get("/", ToughtController.showToughts);

module.exports = router;