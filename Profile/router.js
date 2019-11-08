const { Router } = require("express");

const Profile = require("./model");
const Student = require("../Student/model");

const router = new Router();

router.post("/profile", (req, res, next) => {
    Profile.create(req.body)
    .then(data => res.json(data))
    .catch(next);
});
router.get("/profile/:id", (req, res, next) => {
  Profile.findByPk(req.params.id)
    .then(data => res.json(data))
    .catch(next);
});
router.get("/profile", (req, res, next) => {
  Profile.findAll()
    .then(profile => {
      res.json(profile);
    })
    .catch(err => next(err));
});
router.put("/profile/:id", (req, res, next) => {
  Profile.findByPk(req.params.id, { include: [Student] })
    .then(data => {
      if (data) {
        return data.update(req.body).then(data => {
          res.json(data);
        });
      }
    })
    .catch(err => next(err));
});

module.exports = router;
