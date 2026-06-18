const { updateItemService}  = require("../services/updateItemService");
const { ensureBodyMatchesSchema, ensureIdExists, validateAndParseBody } = require("../helpers/ValidatorHelper");
const { updateItemSchema } = require("../schemas/itemSchema");

const baseHandler = async (event) => {
  try {
    
    const id = event.pathParameters?.id;
    const data = validateAndParseBody(event.body);

    ensureBodyMatchesSchema(data, updateItemSchema);
    ensureIdExists(id);

    const itemUpdated = await updateItemService(id, data);

    return {
    statusCode: 200,
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(itemUpdated),
  };
  } catch(error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        message: error.message || "Ocorreu um erro no sistema."
      })
    }
  }
};


module.exports = { handle };
