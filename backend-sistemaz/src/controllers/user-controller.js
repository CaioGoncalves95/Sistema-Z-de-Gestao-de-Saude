const mongoose = require("mongoose");
const User = mongoose.model("User");
const ProntuarySequence = mongoose.model("ProntuarySequence");

exports.get = async (req, res) => {
  try {
    res.status(200).send("ok");
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: get",
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const checkUserExists = await User.findOne({
      cpf: req.body.cpf,
    });

    if (checkUserExists) {
      res.status(200).json({ error: "Usuário já cadastrado" });
      return;
    }

    let user = new User(req.body);
    user.prontuaryNumber = await generateNextVal();
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar requisição: createUser",
    });
  }
};

exports.checkProntuary = async (req, res) => {
  try {
    const { prontuary } = req.params;

    const prontuaryExists = await User.findOne({
      prontuaryNumber: prontuary,
    });

    if (!prontuaryExists) {
      res.status(400).send(false);
      return;
    }

    res.status(200).json(prontuaryExists);
  } catch (e) {
    res.status(400).send({
      message: "Erro ao executar requisição: checkProntuary",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (user.password === password) {
      res.status(200).json(user);
      return;
    } else {
      res.status(401).send("Usuário e/ou senha inválidos");
    }
  } catch (e) {
    res.status(401).send({
      message: "Erro ao executar requisição: login",
    });
  }
};

async function generateNextVal() {
  let number;
  await ProntuarySequence.findById("600e017fc049b02820202332", (err, doc) => {
    doc.value++;
    number = doc.value;
    doc.save();
  });

  return number;
}
