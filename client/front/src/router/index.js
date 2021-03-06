import Vue from "vue";
import VueRouter from "vue-router";
import Acceuil from "../views/Acceuil.vue";
import ParticuliersPortFolio from "../views/ParticuliersPortFolio.vue";
import ParticuliersTarifs from "../views/ParticuliersTarifs.vue";
import ProfessionnelsPortFolio from "../views/ProfessionnelsPortFolio.vue";
import ProfessionnelsTarifs from "../views/ProfessionnelsTarifs.vue";
import Blog from "../views/Blog.vue";
import Contact from "../views/Contact.vue";
import Admin from "../views/Admin.vue";
import PageNotFound from "../views/404.vue";
import CollectionPhotos from "../views/CollectionPhotos";
import Rgpd from "../views/Rgpd";
import Gallerie from "../views/Gallerie";


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
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
  },
  {
    path: "/collectionPhotos",
    name: "CollectionPhotos",
    component: CollectionPhotos,
  },
  {
    path: "/rgpd",
    name: "Rgpd",
    component: Rgpd,
  },
  {
    path: "/gallerie",
    name: "Gallerie",
    component: Gallerie,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
