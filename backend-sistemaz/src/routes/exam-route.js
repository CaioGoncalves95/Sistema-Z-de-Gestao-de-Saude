const controller = require("../controllers/exam-controller");

const express = require("express");
const router = express.Router();

router.post("/type", controller.createExamType);
router.get("/examNames", controller.getExamsNames);
router.get("/unitNamesByExam/:examName", controller.getUnitsByExam);
router.get(
  "/availableAgenda/:examName&:unit&:month&:day",
  controller.getAvailableHoursByDate
);
// router.get("/createFirstProntuary", controller.createFirstProntuaryNumber);

router.post("/schedule", controller.createSchedule);
router.post("/examAgenda", controller.createExamAgenda);

module.exports = router;
