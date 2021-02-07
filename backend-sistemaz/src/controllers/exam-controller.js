const mongoose = require("mongoose");
const ExamType = mongoose.model("ExamType");
const ExamAgenda = mongoose.model("ExamAgenda");
const Schedule = mongoose.model("Schedule");
const ProntuarySequence = mongoose.model("ProntuarySequence");
const ExamRecord = mongoose.model("ExamRecord");
const EvolutionRecord = mongoose.model("EvolutionRecord");

exports.getExamsNames = async (req, res) => {
  try {
    let examNames = await ExamType.find({}, "name").exec();
    res.status(200).json(examNames);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: getExamsNames",
    });
  }
};

exports.createExamType = async (req, res) => {
  try {
    let examType = new ExamType(req.body);

    await examType.save();

    res.status(200).json(examType);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: createExamType",
    });
  }
};

exports.getUnitsByExam = async (req, res) => {
  try {
    const examName = req.params.examName;

    const exams = await ExamType.findOne({
      name: examName,
    });

    res.status(200).json(exams.units);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: getUnitsByExam",
    });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);

    await schedule.save();

    res.status(200).json(schedule);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: createSchedule",
    });
  }
};

exports.createExamAgenda = async (req, res) => {
  try {
    const agenda = new ExamAgenda(req.body);

    await agenda.save();

    res.status(200).json(agenda);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: createExamAgenda",
    });
  }
};

exports.getAvailableHoursByDate = async (req, res) => {
  // precisa mandar Exame, Unidade e Data, e ele retorna os horários disponíveis
  try {
    const { examName, unit, month, day } = req.params;

    const exam = await ExamType.findOne({
      name: examName,
    });

    const agenda = await ExamAgenda.findOne({
      unit: unit,
      examType: exam._id,
      monthReference: month,
    });

    let availableStartTime;
    for (let scheduleID of agenda.schedule) {
      let schedule = await Schedule.findById(scheduleID);
      if (schedule.day === parseInt(day)) {
        availableStartTime = schedule.schedule
          .filter((sch) => sch.booked === false)
          .map((sch) => sch.startTime);
      }
    }

    res.status(200).send(availableStartTime);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: getAvailableHoursByDate",
    });
  }
};

exports.getExamHistory = async (req, res) => {
  try {
    const { prontuaryNumber } = req.body;

    const examHistoric = await ExamRecord.find({
      prontuaryNumber: prontuaryNumber,
    });

    res.status(200).json(examHistoric);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: getExamHistoric",
    });
  }
};

exports.createExamHistory = async (req, res) => {
  try {
    const examRecord = new ExamRecord(req.body);
    await examRecord.save();
    res.status(200).json(examRecord);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: createExamHistory",
    });
  }
};

exports.getEvolutionHistory = async (req, res) => {
  try {
    const { prontuaryNumber } = req.body;

    const evolutionHistoric = await EvolutionRecord.find({
      prontuaryNumber: prontuaryNumber,
    });

    res.status(200).json(evolutionHistoric);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: getEvolutionHistory",
    });
  }
};

exports.createEvolutionHistory = async (req, res) => {
  try {
    const evolutionRecord = new EvolutionRecord(req.body);
    await evolutionRecord.save();

    res.status(200).json(evolutionRecord);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: createEvolutionHistory",
    });
  }
};

// exports.createFirstProntuaryNumber = async (req, res) => {
//   try {
//     // const prontuary = new ProntuarySequence({
//     //   value: 1,
//     // });

//     // await prontuary.save();
//     generateNextVal();
//     res.status(200).send();
//   } catch (e) {
//     res.status(400);
//   }
// };
