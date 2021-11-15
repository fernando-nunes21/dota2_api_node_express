const router = require("express").Router();
const heroService = require("../service/heroService");

router.get("/", async function (req, res) {
  const response = await heroService.getHeroes(req);
  res.json(response);
});

router.get("/:id", async function (req, res) {
  const response = await heroService.getHeroById(req);
  res.json(response);
});

router.post("/", async function (req, res) {
  const response = await heroService.createHero(req);
  res.json(response);
});

router.put("/:id", async function (req, res) {
  const response = await heroService.editHero(req);
  res.json(response);
});

router.delete("/:id", async function (req, res) {
  const response = await heroService.deleteHero(req);
  res.json(response);
});

module.exports = router;
