import Ajv from "ajv";
import { CreateItemService } from "../services/createItemService";
import { ValidatorHelper } from "../helpers/ValidadorHelper";
import { itemSchema } from "../schemas/itemSchema";

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(itemSchema);

export const handle = async (event) => {
  try {
    ValidatorHelper.ensureBodyExists(event.body);

    const data = JSON.parse(event.body);

    const valid = validate(data);
    if (!valid) {
      const validationError = new Error(
        "Falha na validação dos dados de entrada",
      );
      validationError.statusCode = 400;
      validationError.errors = validate.errors;
      throw validationError;
    }

    const itemCriado = await createItemService(data);

    return {
      statusCode: 201,
      body: JSON.stringify(newItem),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: error.message }),
    };
  }
};
