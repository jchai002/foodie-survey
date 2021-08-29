const db = require("diskdb");
const collection = "answers";
db.connect("./data", [collection]);

function createAnswer(data) {
  let res = db.answers.save(data);
  return res._id;
}

function getAnswer(id) {
  return db.answers.find({ _id: id })[0];
}

function getAllAnswers() {
  return db.answers.find();
}

function updateAnswer(id, data) {
  db.answers.update({ _id: id }, data);
}

module.exports = { createAnswer, getAnswer, updateAnswer, getAllAnswers };
