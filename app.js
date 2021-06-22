const fastify = require("fastify");
const find = require("lodash/fp/find");
const list = require("./list.json");
const detail = require("./detail.json");

const app = fastify();

app.route({
  method: "GET",
  url: "/api/v2/pokemon",
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          count: { type: "number" },
          next: { type: "null" },
          previous: { type: "null" },
          results: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                url: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  handler: function (request, reply) {
    reply.send(list);
  },
});

app.route({
  method: "GET",
  url: "/api/v2/pokemon/:id",
  schema: {
    params: {
      id: { type: "number" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          height: { type: "number" },
          weight: { type: "number" },
        },
      },
    },
  },
  handler: function (request, reply) {
    reply.send(find(request.params, detail));
  },
});

const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
