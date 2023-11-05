const AiMessage = require("../models/aiMessages");

const addMessage = async (body) => {
  try {
    AiMessage.create(body);
  } catch (error) {
    return false;
  }
};

module.exports = addMessage;
