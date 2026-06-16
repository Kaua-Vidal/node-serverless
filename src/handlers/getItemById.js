const lambdaWrapper = require("../utils/lambdaWrapper");
const itemService = require("../services/itemService");

const baseHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  const item = await itemService.getById(id);

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};

const handle = lambdaWrapper(baseHandler);

module.exports = { handle };
