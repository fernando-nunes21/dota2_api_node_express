const router = require("express").Router();
const heroService = require("../service/heroService");

router.get("/", async function (req, res) {
  const response = await heroService.getHeroes(req);
  res.status(response.status || 200).json(response);
});

router.get("/:id", async function (req, res) {
  const response = await heroService.getHeroById(req);
  res.status(response.status || 200).json(response);
});

router.post("/", async function (req, res) {
  const response = await heroService.createHero(req);
  res.status(response.status || 200).json(response);
});

router.put("/:id", async function (req, res) {
  const response = await heroService.editHero(req);
  res.status(response.status || 200).json(response);
});

router.delete("/:id", async function (req, res) {
  const response = await heroService.deleteHero(req);
  res.status(response.status || 200).json(response);
});

module.exports = router;
