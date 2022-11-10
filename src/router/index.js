import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Odd from "../pages/Odd.vue";
import Even from "../pages/Even.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/odd",
        name: "Odd",
        component: Odd,
    },
    {
        path: "/even",
        name: "Even",
        component: Even,
    },
];

const router = createRouter({
    history: createWebHistory('/advent_calendar/'),
    routes,
});

export default router;