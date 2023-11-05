const addMessage = require("../services/aiMessagesService");
const aiMessageSchema = require("../schemas/aiMessagesSchema");
const validate = require("../services/ai/validate");
const action = require("../services/ai/action");

const createMessage = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const body = req.body;
    let response = "";
    let flagged = false;

    const check = aiMessageSchema.validate(body);

    flagged = await validate(body.message);

    if (check.error) {
      return res.status(400).json({
        message: check.error.details[0].message,
        code: 400,
      });
    }

    if (flagged) {
      return res.status(403).json({
        message: "Your inquiry failed verification and violates our policy",
        code: 403,
      });
    }

    const messageResponse = await action(body.message);

    if (messageResponse === null)
      response = `Sorry. Your question is beyond my abilities. I can only operate on the task list and the tasks associated with it.`;

    const messageData = { ...body, response };
    messageData.owner = owner;
    await addMessage(messageData);

    res.json({
      status: "created",
      code: 201,
      message: response,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = createMessage;
