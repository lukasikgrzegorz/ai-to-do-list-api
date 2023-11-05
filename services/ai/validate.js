const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.OPENAI_API_KEY;

const validate = async (prompt) => {
  try {
    const response = await axios.post(
      `https://api.openai.com/v1/moderations`,
      { input: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (response.data.results) {
      return response.data.results[0].flagged;
    } else {
      throw new Error("Nieprawidłowa odpowiedź API");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = validate;
