const mongoose = require ('mongoose');
const Ajv = require ('ajv');

const ajv = new Ajv({ allErrors: true });

function ensureIdExists(id) {
  if (!id || id.trim() === "" || id === "undefined" || id === "null") {
    const error = new Error("O identificador único (ID) do item é obrigatório");
    error.statusCode = 400;
    throw error;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`ò ID fornecido ${id} não está no formato válido`);
    error.statusCode = 400;
    throw error;
  }
}

function validateAndParseBody(rawBody, schema) {
  if (!rawBody) {
    const error = new Error(
      "O corpo (body) da requisiçao não foi fornecido ou está vázio",
    );
    error.statusCode = 400;
    throw error;
  }

  let parsedData;

  try {
    parsedData = JSON.parse(rawBody);
  } catch (e) {
    const error = new Error("O corpo da requisição não é um jSON válido.")
    error.statusCode = 400;
    throw error;
  }

  return parsedData;
}

function ensureBodyMatchesSchema(body, schema) {
  const valid = ajv.validate(schema, body);

  if (!valid) {
    const validationError = new Error("Falha na validação dos dados de entrada");
    validationError.statusCode = 400;
    validationError.errors = ajv.errors;
    throw validationError;
  }
}

module.exports = { ensureIdExists, validateAndParseBody, ensureBodyMatchesSchema };
