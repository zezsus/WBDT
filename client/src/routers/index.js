/** @format */

import NotFound from "../components/notfound.component";
import HomeComponent from "../products/home/components/home.component";
import ProductDetailComponent from "../products/productdetail/components/productdetail.component";

export const routers = [
  {
    path: "/product",
    page: HomeComponent,
    isShowHeader: true,
  },

  {
    path: "/",
    page: HomeComponent,
    isShowHeader: true,
  },

  {
    path: "/product/:id",
    page: ProductDetailComponent,
    isShowHeader: true,
  },

  {
    path: "*",
    page: NotFound,
  },
];
