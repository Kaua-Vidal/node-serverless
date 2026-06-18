const {createItemService } = require("../services/createItemService");
const { validateAndParseBody, ensureBodyMatchesSchema } = require ("../helpers/ValidatorHelper");
const { createItemSchema } = require ("../schemas/itemSchema");


const handle = async (event) => {
  try {
    const data = validateAndParseBody(event.body, createItemSchema);
    ensureBodyMatchesSchema(data, createItemSchema);

    const itemCriado = await createItemService(data);

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(itemCriado),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: error.message }),
    };
  }
};

module.exports = { handle };