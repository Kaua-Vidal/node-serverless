const { getItemService } = require("../services/getItemService");
const { ensureIdExists } = require("../helpers/ValidatorHelper");


const handle = async (event) => {
  try {

    const id = event.pathParameters?.id;

    ensureIdExists(id);

    const item = await getItemService(id);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(item),
    };
  } catch(error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: error.message || "Ocorreu um erro inesperado no servidor." }) 
    }
  }
};

module.exports = { handle };
