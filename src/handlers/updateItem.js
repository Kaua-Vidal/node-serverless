const itemService = require("../services/itemService");
const lambdaWrapper = require("../utils/lambdaWrapper");

const baseHandler = async (event) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);

  const updatedItem = await itemService.update(id, data);

  return {
    statusCode: 200,
    body: JSON.stringify(updatedItem),
  };
};

const handle = lambdaWrapper(baseHandler)
module.exports = { handle }