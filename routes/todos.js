const express = require("express");
const router = express.Router();
const totoController = require("../controller/todoController");
const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../validate/todoValidation");

/* GET list todo. */
router.get("/", authMiddleware, totoController.getList);

/* POST create todo. */
router.post("/", authMiddleware, validate.create, totoController.create);

/* GET find todo. */
router.get("/:id", authMiddleware, totoController.find);

/* PUTH update todo by id. */
router.put("/:id", authMiddleware, validate.update, totoController.update);

/* POST update status todos . */
router.put("/", authMiddleware, validate.update, totoController.updateMany);

/* DELETE delete todo by id. */
router.delete("/:id", authMiddleware, totoController.delete);

/* DELETE delete todos complete. */
router.delete("/", authMiddleware, totoController.deleteComplele);

module.exports = router;
