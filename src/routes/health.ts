import Router from "koa-tree-router";

const router = new Router();

router.get("/", function (ctx) {
  ctx.log.info("OK");
  ctx.body = { health: "OK" };
  return;
});

export default router;
