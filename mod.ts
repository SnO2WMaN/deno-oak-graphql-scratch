import { oakCors } from "cors/mod.ts";
import { Application, Router } from "oak/mod.ts";

const app = new Application();
const router = new Router();

router.post("/graphql", ({ request, response }) => ({}));

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 4000 });
