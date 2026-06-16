const createItemSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 3 },
        description: { type: "string", minLength: 10 },
        price: { type: "number", minimum: 0.01 },
        image_url: { type: "string" }
    },
    required: ["name", "description", "price", "image_url"],
    additionalProperties: false //bloqueia campos extras enviados
};

const updateItemSchema = {
    type: "object",
    properties: createItemSchema.properties,
    additionalProperties: false
}

module.exports = { createItemSchema, updateItemSchema };