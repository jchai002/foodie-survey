const express = require("express");
const routes = express.Router();
const db = require("./db");

// save pic
routes.post("/picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "no file detected",
      });
    } else {
      const { picture } = req.files;
      const { id } = req.body;
      const ALLOWED_MIME_TYPE = ["image/jpeg", "image/png"];
      if (!ALLOWED_MIME_TYPE.includes(picture.mimetype))
        throw new Error("incorrect mime type");
      const ext = picture.mimetype.split("/")[1];
      const picName = `${id}.${ext}`;
      picture.mv(`./uploads/${picName}`);
      const answer = db.getAnswer(id);
      db.updateAnswer(id, {
        ...answer,
        picture: `http://localhost:4000/uploads/${picName}`,
      });

      res.status(200).send({ message: `picture saved as ${picName}` });
    }
  } catch (e) {
    console.log("error in picture/post", e);
    res.status(500).send(e);
  }
});

// save answer
routes.post("/answers", async (req, res) => {
  try {
    const id = db.createAnswer(req.body);
    res.status(200).send({
      id,
    });
  } catch (e) {
    console.log("error in answers/post", e);
    res.status(500).send(e);
  }
});

// get all answers
routes.get("/answers", async (req, res) => {
  try {
    res.status(200).send({ data: db.getAllAnswers() });
  } catch (e) {
    console.log("error in answers/get", e);
    res.status(500).send(e);
  }
});

module.exports = routes;
