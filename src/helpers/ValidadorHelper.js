import mongoose from 'mongoose';

export function ensureIdExists(id) {
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

export function ensureBodyExists(body) {
  if (!body) {
    const error = new Error(
      "O corpo (body) da requisiçao não foi fornecido ou está vázio",
    );
    error.statusCode = 400;
    throw error;
  }
}
