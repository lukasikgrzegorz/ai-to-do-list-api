const addTask = {
  name: "addTask",
  description: "Add task to list with specific title and date",
  parameters: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "provide task title",
      },
      date: {
        type: "string",
        description: "provide task date",
      },
    },
  },
};

const noMatchingAction = {
  name: "noTask",
  description:
    "Return info about no matching action if model cant fit action to user message",
  function_call: "auto",
  parameters: {
    type: "object",
    properties: {},
  },
};

module.exports = {
  addTask,
  noMatchingAction,
};
