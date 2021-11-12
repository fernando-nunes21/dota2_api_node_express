const heroRepository = require('../repository/heroRepository');

exports.getHeroes = function () {
    return heroRepository.getHeroes();
};

exports.getHeroById = function (req) {
    return heroRepository.getHeroById(req.params.id);
};

exports.createHero = function (req) {
    return heroRepository.createHero(req.body);
};

exports.editHero = function (req){
    return heroRepository.editHero(req.params.id, req.body);
};

exports.deleteHero = function (req){
    return heroRepository.deleteHero(req.params.id);
};