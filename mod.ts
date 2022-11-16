import { oakCors } from "cors/mod.ts";
import { graphql } from "graphql";
import { Application, Router } from "oak/mod.ts";
import { schema } from "./schema.ts";

const app = new Application();
const router = new Router();

router.post("/graphql", async ({ request, response }) => {
  const { query, variables, operationName } = await request.body().value;

  response.body = await graphql({
    schema: schema,
    source: query,
    variableValues: variables,
    operationName: operationName,
  });
  return;
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 4000 });
