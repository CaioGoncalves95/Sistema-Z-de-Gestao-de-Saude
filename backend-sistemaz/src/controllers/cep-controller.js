const axios = require("axios");

exports.getByCEP = (req, res) => {
  const { cep } = req.params;

  axios
    .get(`https://viacep.com.br/ws/${cep}/json`)
    .then((response) => {
      res.status(200).json({
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        localidade: response.data.localidade,
        uf: response.data.uf,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
