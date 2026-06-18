const { getAllItemsService } = require("../services/getAllItemsService");

const handle = async (event) => {
  try {
    const items = await getAllItemsService();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(items),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message || "Ocorreu um erro inesperado ao listar os itens."
      })
    }
  }

};

module.exports = { handle };

