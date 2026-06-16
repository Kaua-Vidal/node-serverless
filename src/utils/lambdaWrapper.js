const AppError = require('../errors/AppError');

const lambdaWrapper = (handler) => {
    return async (event, context) => {
        try {
            context.callbackWaitsForEmptyEventLoop = false;

            return await handler(event, context);
        } catch(error) {
            const headers = {
                "Content-Type": "application/json"
            };

            if (error.name === 'CastError'){
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        timestamp: new Date().toISOString(),
                        status: 400,
                        errors: "Bad Request",
                        message: "O ID enviado possui um formato inválido para o banco de dados."
                    })
                }
            };

            if (error instanceof AppError || error.statusCode) {
                return {
                    statusCode: error.statusCode || 400,
                    headers,
                    body: JSON.stringify({
                        timestamp: new Date().toISOString(),
                        status: error.statusCode || 400,
                        errors: error.statusCode === 404 ? "Not Found" : "Business Error",
                        message: error.message
                    })
                }
            }

            console.error("Erro não tratado no Wrapper Global: ", error);

            return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({
                        timestamp: new Date().toISOString(),
                        status: 500,
                        errors: "Internal Server Error",
                        message: "Ocorreu um erro interno no servidor.",
                        details: error.message
                    })
                }
        }

    
    }
}

module.exports = lambdaWrapper