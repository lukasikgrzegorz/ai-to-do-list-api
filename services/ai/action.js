const { ChatOpenAI } = require("langchain/chat_models/openai");
const { HumanMessage, SystemMessage } = require("langchain/schema");
const { parseFunctionCall } = require('../../helpers/parseFunctionCall')
const {
  addTask,
  noMatchingAction,
} = require("../../schemas/aiFunctionsSchema");
require("dotenv").config();

const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" }).bind({
  functions: [addTask, noMatchingAction],
});

const action = async (query) => {
  try {
    const conversation = await model.invoke([
      new SystemMessage(
        `if you cannot match fuction, return the noMatchingAction function by default`
      ),
      new HumanMessage(query),
    ]);

    if (conversation) {
      console.log(conversation);
      return parseFunctionCall(conversation);
    } else {
      throw new Error("API response error");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = action;
