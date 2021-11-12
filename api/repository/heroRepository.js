const e = require("express");
const database = require("../connection/database");

function buildResponseMessage(message, status) {
  return (responseMessage = {
    message: message,
    status: status,
  });
}

exports.getHeroes = function () {
  return database.query("SELECT * FROM heroes");
};

exports.getHeroById = function (id) {
  return database.query("SELECT * FROM heroes WHERE id = $1", [id]);
};

exports.createHero = function (body) {
  database.query(
    "INSERT INTO heroes (name, lane, difficult, skills, skins) VALUES ($1, $2, $3, $4, $5)",
    [body.name, body.lane, body.difficult, body.skills, body.skins]
  );

  return buildResponseMessage("Heroi cadastrado na base de dados", 200);
};

exports.editHero = function (id, body) {
  database.query(
    "UPDATE heroes SET name = $2, lane = $3, difficult = $4, skills = $5, skins = $6 WHERE id = $1",
    [id, body.name, body.lane, body.difficult, body.skills, body.skins]
  );

  return buildResponseMessage("Heroi editado com sucesso", 200);
};

exports.deleteHero = function (id) {
  database.query("DELETE FROM heroes WHERE id = $1", [id]);

  return buildResponseMessage('Heroi deletado com sucesso', 200);
};
