const itemService = require("../services/itemService");
const lambdaWrapper = require("../utils/lambdaWrapper");
const AppError = require("../errors/AppError");

const baseHandler = async (event) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body = JSON.parse(event.body || "{}");

  const newItem = await itemService.create(data);

  return {
    statusCode: 201,
    body: JSON.stringify(newItem),
  };
};

const handle = lambdaWrapper(baseHandler);
module.exports = { handle };
