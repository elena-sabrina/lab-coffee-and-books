const express = require("express");
const Place = require("./../models/place");

const router = express.Router();

// Handle GET request for website root

//Display all Places
router.get("/", (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render("places/index", { places });
      //res.render("index", { title: "Hello World!" });
    })
    .catch((error) => {
      next(error);
    });
});

//Add Places
router.get("/create", (req, res, next) => {
  res.render("places/create");
});

router.post("/", (req, res, next) => {
  const data = req.body;
  const place = new Place({
    name: data.name,
    type: data.type
  });
  place
    .save()
    .then((place) => {
      console.log("Place created");
      res.redirect("/places");
    })
    .catch((error) => {
      next(error);
    });
});

//Display single Place

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((places) => {
      res.render("places/show", { places });
    })
    .catch((error) => {
      next(error);
    });
});

//Delete Place

router.post("/:id/delete", (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/places");
    })
    .catch((error) => {
      next(error);
    });
});

//Editing Places

router.get("/:id/edit", (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((places) => {
      res.render("places/edit", { places });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:id", (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const type = req.body.type;
  Place.findByIdAndUpdate(id, { name, type })
    .then((places) => {
      console.log("Place edited");
      res.redirect("/places");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
