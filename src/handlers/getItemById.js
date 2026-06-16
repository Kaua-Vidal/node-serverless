

export const handle = async (event) => {
  try {
    const id = event.pathParameters?.id;

    ValidatorHelper
  } catch() {

  }
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
