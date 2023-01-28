import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Odd from "../pages/Odd.vue";
import Even from "../pages/Even.vue";
import ListView from "../pages/ListView.vue";

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
    {
        path: "/list",
        name: "ListView",
        component: ListView,
    },
];

const router = createRouter({
    history: createWebHistory('/advent_calendar/'),
    routes,
});

export default router;