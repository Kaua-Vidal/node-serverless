// DESCRIBE -> Bloco de testes (onde começa os teste (conjunto))
// IT or TEST -> Declara unico teste unitário
// EXPECT -> Asserções sobre o teste para validar o resultado
const createItemHandler = require("../handlers/createItem");
const { createItemService } = require("../services/createItemService");
jest.mock("../services/createItemService");

describe("CreateItem Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Deve criar um item com sucesso e retornar status 201", async () => {
    const event = {
      body: JSON.stringify({
        name: "test",
        description: "description test",
        price: 10.0,
        image_url: "url/test",
      }),
    };

    createItemService.mockResolvedValue({
      _id: "mock-id-123",
      name: "test",
      description: "description test",
      price: 10.0,
      image_url: "url/test",
    });

    const response = await createItemHandler.handle(event);

    expect(response.statusCode).toBe(201);
    expect(response.headers["Content-Type"]).toBe("application/json");

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty("_id");
    expect(responseBody.name).toBe("test");

    expect(createItemService).toHaveBeenCalledTimes(1);
    expect(createItemService).toHaveBeenCalledWith({
      name: "test",
      description: "description test",
      price: 10.0,
      image_url: "url/test",
    });
  });

  const camposObrigatorios = ["name", "description", "price", "image_url"];

  test.each(camposObrigatorios)(
    "Deve retornar 400 se se o campo '%s' estiver faltando",
    async (campoFaltante) => {

      const payload = {
          name: "test",
          description: "description test",
          price: 10.0,
          image_url: "url/test",
      };

      delete payload[campoFaltante]
      const event = JSON.stringify(payload);

      const response = await createItemHandler.handle(event);

      expect(response.statusCode).toBe(400);

      const responseBody = JSON.parse(response.body);
      expect(responseBody).toHaveProperty("message");

      expect(createItemService).not.toHaveBeenCalled();
    },
  );
});
