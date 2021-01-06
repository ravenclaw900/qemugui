import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Main from "@/pages/main.vue";
import New from "@/pages/new.vue";
import Image from "@/pages/image.vue";
import Delete from "@/pages/delete.vue";
import Info from "@/pages/info.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Main },
  { path: "/new", component: New },
  { path: "/image", component: Image },
  { path: "/delete", component: Delete },
  { path: "/info/:name", component: Info },
  { path: "/start/:name", component: Info },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
