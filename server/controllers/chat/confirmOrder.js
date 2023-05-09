const { addMessage } = require("../messages");
const addOrderItems = require("../order/addOrderItems");

const confirmOrder = async (req, msg, res, lastMsg) => {
  addOrderItems(lastMsg.payload.order.name, lastMsg.payload.quantity);
  if (msg == "yes") {
    await addMessage({
      cookie: req.cookies["message"],
      message: `what do you want?`,
      type: "sent",
      payload: {
        step: "greeting",
        quantity: +lastMsg.payload.quantity,
        order: {
          name: lastMsg.payload.order.name,
        },
      },
    });

    return res.json({
      data: [{ message: "what do you want?" }],
    });
  } else if (msg == "no") {
    await addMessage({
      cookie: req.cookies["message"],
      message: `Please enter your address`,
      type: "sent",
      payload: {
        step: "address",
        quantity: +lastMsg.payload.quantity,
        order: {
          name: lastMsg.payload.order.name,
        },
      },
    });
    return res.json({
      data: [{ message: "Please enter your address" }],
    });
  } else {
    await addMessage({
      cookie: req.cookies["message"],
      message: `please enter yes or no`,
      type: "sent",
      payload: {
        step: "quantity",
        quantity: +lastMsg.payload.quantity,
        order: {
          name: lastMsg.payload.order.name,
        },
      },
    });

    return res.json({
      data: [{ message: "please enter yes or no" }],
    });
  }
};

module.exports = confirmOrder;
