const itemService = require("../services/itemService");
const lambdaWrapper = require("../utils/lambdaWrapper");

const baseHandler = async (event) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const items = await itemService.getAll();

  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};


const handle = lamdaWrapper(baseHandler);
module.exports = { handle };