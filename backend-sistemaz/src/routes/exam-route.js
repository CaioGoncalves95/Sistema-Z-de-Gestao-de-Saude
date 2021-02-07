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
router.post("/examHistory", controller.getExamHistory);
router.post("/examHistory/create", controller.createExamHistory);
router.post("/evolutionHistory", controller.getEvolutionHistory);
router.post("/evolutionHistory/create", controller.createEvolutionHistory);
// router.get("/createFirstProntuary", controller.createFirstProntuaryNumber);

router.post("/schedule", controller.createSchedule);
router.post("/examAgenda", controller.createExamAgenda);

module.exports = router;
