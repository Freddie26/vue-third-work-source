import { createRouter, createWebHistory } from "vue-router";
import routes from './routes'
import { guardPipeline } from "./guards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

guardPipeline(router);

export default router;
