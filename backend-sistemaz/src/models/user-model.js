const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: String,
  },
  age: {
    type: Number,
  },
  cpf: {
    type: String,
  },
  profession: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  accessProfile: {
    type: String,
  },
  address: {
    cep: String,
    street: String,
    neighborhood: String,
    number: String,
    complement: String,
    city: String,
    state: String,
  },
  prontuaryNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("User", schema);

/*
{
    "name": "",
    "lastname": "",
    "phone": "",
    "age": "",
    "cpf": "",
    "profession": "",
    "email": "",
    "password": "",
    "address": {
        "cep": "",
        "street": "",
        "neighborhood": "",
        "number": "",
        "complement": "",
        "city": "",
        "state": ""
    }
}
*/
