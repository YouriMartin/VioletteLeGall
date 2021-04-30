import Vue from "vue";
import VueRouter from "vue-router";
import Acceuil from "../views/Acceuil.vue";
import ParticuliersPortFolio from "../views/ParticuliersPortFolio.vue";
import ParticuliersTarifs from "../views/ParticuliersTarifs.vue";
import ProfessionnelsPortFolio from "../views/ProfessionnelsPortFolio.vue";
import ProfessionnelsTarifs from "../views/ProfessionnelsTarifs.vue";
import Blog from "../views/Blog.vue";
import Contact from "../views/Contact.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Acceuil",
    component: Acceuil,
  },
  {
    path: "/particuliers/portfolio",
    name: "ParticuliersPortFolio",
    component: ParticuliersPortFolio,
  },
  {
    path: "/particuliers/tarifs",
    name: "ParticuliersTarifs",
    component: ParticuliersTarifs,
  },
  {
    path: "/professionnels/portfolio",
    name: "ProfessionnelsPortFolio",
    component: ProfessionnelsPortFolio,
  },
  {
    path: "/professionnels/tarifs",
    name: "ProfessionnelsTarifs",
    component: ProfessionnelsTarifs,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
