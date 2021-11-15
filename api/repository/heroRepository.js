const database = require("../connection/database");

exports.getHeroes = async function (params) {
  return database.query(
    "SELECT * FROM heroes WHERE 1=1 AND lane LIKE $1 AND difficult LIKE $2 OFFSET $3 LIMIT $4",
    [params?.lane, params?.difficult, params.offset, params.limit]
  );
};

exports.getHeroById = function (id) {
  return database.query("SELECT * FROM heroes WHERE id = $1", [id]);
};

exports.createHero = function (body) {
  database.query(
    "INSERT INTO heroes (name, lane, difficult, skills, skins) VALUES ($1, $2, $3, $4, $5)",
    [body.name, body.lane, body.difficult, body.skills, body.skins]
  );
};

exports.editHero = function (id, body) {
  database.query(
    "UPDATE heroes SET name = $2, lane = $3, difficult = $4, skills = $5, skins = $6 WHERE id = $1",
    [id, body.name, body.lane, body.difficult, body.skills, body.skins]
  );
};

exports.deleteHero = function (id) {
  database.query("DELETE FROM heroes WHERE id = $1", [id]);
};
