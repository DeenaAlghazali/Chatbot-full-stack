let natural = require("natural");
const { Menu } = require("../../models");
const { addMessage, getMessages } = require("../messages");
const {
  checkIfInMenu,
  checkQuantity,
  confirmOrder,
  checkAddress,
  welcomeMsg,
} = require("./index");

let classifier = new natural.BayesClassifier();

async function training(req, res) {
  const { message } = req.body;
  if (message) {
    const getAllItems = await Menu.find();
    getAllItems.forEach(({ name }) => {
      classifier.addDocument(name, name);
    });

    classifier.addDocument("Hi Hello", "Hi");
    classifier.addDocument("no No", "no");
    classifier.addDocument("yes Yes", "yes");
    classifier.train();

    await addMessage({
      cookie: req.cookies["message"],
      message,
      type: "received",
      payload: {},
    });

    let msg = classifier.classify(message);
    let allMsgs = await getMessages(req.cookies["message"]);
    let lastMsg = allMsgs[allMsgs.length - 1];

    let step = lastMsg?.payload?.step;
    if (msg == "Hi") {
      return await welcomeMsg(res);
    } else if (step == "greeting") {
      return await checkIfInMenu(req, res, message, getAllItems);
    } else if (step == "order") {
      await checkQuantity(req, message, res, lastMsg);
    } else if (step == "quantity") {
      await confirmOrder(req, msg, res, lastMsg);
    } else if (step == "address") {
      await checkAddress(req, res);
    } else {
      res.json("I don't understand what do you want");
    }
  }
}

module.exports = training;
