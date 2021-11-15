const heroRepository = require("../repository/heroRepository");

exports.getHeroes = function (req) {
  const params = buildRequestParams(req);
  return heroRepository.getHeroes(params).then((response) => {
    const result =
      response.length == 0
        ? buildResponseMessage("Nennhum heroi encontrado", 404)
        : response;
    return result;
  });
};

exports.getHeroById = function (req) {
  return findHeroById(req.params.id).then((response) => {
    const result =
      response.length == 0
        ? buildResponseMessage("ID de heroi nao encontrado", 404)
        : response;
    return result;
  });
};

exports.createHero = function (req) {
  //validate hero body before create;
  heroRepository.createHero(req.body);
  return buildResponseMessage("Heroi cadastrado na base de dados", 200);
};

exports.editHero = function (req) {
  return findHeroById(req.params.id).then((response) => {
    if (response.length > 0) {
      heroRepository.editHero(req.params.id, req.body);
      return buildResponseMessage("Heroi editado com sucesso", 200);
    } else {
      return buildResponseMessage("Heroi nao editado. ID nao encontrado", 404);
    }
  });
};

exports.deleteHero = function (req) {
  return findHeroById(req.params.id).then((response) => {
    if (response.length > 0) {
      heroRepository.deleteHero(req.params.id);
      return buildResponseMessage("Heroi deletado com sucesso", 200);
    } else {
      return buildResponseMessage("Heroi nao deletado. ID nao encontrado", 404);
    }
  });
};

function findHeroById(id) {
  return heroRepository.getHeroById(id);
}

function buildRequestParams(req) {
  const params = {
    lane: req.query.lane || "%",
    difficult: req.query.difficult || "%",
    offset: req.query.offset || 0,
    limit: req.query.limit || 20,
  };

  return params;
}

function buildResponseMessage(message, status) {
  return (responseMessage = {
    message: message,
    status: status,
  });
}

//aprimorar transformando em função a logica do retorno do findHeroById
