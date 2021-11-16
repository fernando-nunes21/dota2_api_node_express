const heroRepository = require("../repository/heroRepository");

exports.getHeroes = function (req) {
  const params = buildRequestParams(req.query);
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
  try {
    isLaneInputInvalid(req.body.lane);
    isDifficultInputInvalid(req.body.difficult);
    isFieldArrayInvalid(req.body.skills || [], "Skills");
    isFieldArrayInvalid(req.body.skins || [], "Skins");
    heroRepository.createHero(req.body);
    return buildResponseMessage("Heroi cadastrado na base de dados", 200);
  } catch (error) {
    return error;
  }
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

function inputError(message) {
  const error = {
    message: message,
    status: 400,
  };
  return error;
}

function isLaneInputInvalid(lane) {
  if (lane !== "safe" && lane !== "mid" && lane !== "off") {
    throw new inputError("Lane informada é inválida, vazia ou não definida");
  }
}

function isDifficultInputInvalid(difficult) {
  if (difficult !== "easy" && difficult !== "medium" && difficult !== "hard") {
    throw new inputError(
      "Difficult informada é inválida, vazia ou não definida"
    );
  }
}

function isFieldArrayInvalid(field, fieldName) {
  if (field.length === 0) {
    throw new inputError(
      "Campo '" +
        fieldName +
        "' não é um Array de '" +
        fieldName +
        "', não foi definido ou está vazio"
    );
  }
}

function buildRequestParams(query) {
  const params = {
    lane: query.lane || "%",
    difficult: query.difficult || "%",
    offset: query.offset || 0,
    limit: query.limit || 20,
  };
  return params;
}

function buildResponseMessage(message, status) {
  return (responseMessage = {
    message: message,
    status: status,
  });
}
