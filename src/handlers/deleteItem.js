const itemService = require("../services/itemService");
const lambdaWrapper = require("../utils/lambdaWrapper");

const baseHandler = async (event) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;

  const deletedItem = await itemService.delete(id);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Item "${deletedItem.name}" removido com sucesso!`,
    }),
  };
};

const handle = lamdaWrapper(baseHandler);
module.exports = { handle };
