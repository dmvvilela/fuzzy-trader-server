const router = require("express").Router();
let Asset = require("../models/asset.model");

router.route("/").get((req, res) => {
  Asset.find()
    .then((assets) => res.json(assets))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Asset.findById(req.params.id)
    .then((asset) => res.json(asset))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/add").post((req, res) => {
  const code = req.body.code;
  const name = req.body.name;
  const type = req.body.type;
  const amount = req.body.amount;
  const value = req.body.value;
  const date = new Date();
  const newAsset = new Asset({ code, amount, name, type, value, date });

  newAsset
    .save()
    .then(() => res.json("Asset added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Asset.findById(req.params.id)
    .then((asset) => {
      // asset.code = req.body.code;
      // asset.name = req.body.name;
      // asset.type = req.body.type;
      asset.amount = Number(req.body.amount) + asset.amount;
      asset.value = Number(req.body.value) + asset.value;
      asset.date = new Date();

      asset
        .save()
        .then(() => res.json("Asset updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").delete((req, res) => {
  Asset.findByIdAndDelete(req.params.id)
    .then((asset) => res.json("Asset deleted."))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/reset").post((req, res) => {
  Asset.find()
    .then((assets) => {
      assets.forEach(async (asset) => {
        await Asset.findByIdAndDelete(asset._id);
        // res.json("Assets deleted.");
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
