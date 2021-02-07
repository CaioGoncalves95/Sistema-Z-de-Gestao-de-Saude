const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

// Conecta no banco MongoDB
mongoose
  .connect(
    "mongodb+srv://caio:caio@baltadb-d1fem.gcp.mongodb.net/sistemaZ?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(3010, () => {
      console.log("Server rodando na porta 3010");
    });
  })
  .catch(() => {
    console.log("Erro ao iniciar backend");
  });

// Carrega os Models
const User = require("./models/user-model");
const ExamType = require("./models/examType-model");
const ExamAgenda = require("./models/examAgenda-model");
const ExamRecord = require("./models/examRecord-model");
const Evolution = require("./models/evolutionRecord-model");
const Schedule = require("./models/schedule-model");
const ProntuarySequence = require("./models/prontuary-sequence");

const userRoute = require("./routes/user-route");
const cepRoute = require("./routes/cep-route");
const examRoute = require("./routes/exam-route");

app.use(express.json());

app.use("/user", userRoute);
app.use("/cep", cepRoute);
app.use("/exam", examRoute);
