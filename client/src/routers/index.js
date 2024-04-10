/** @format */

import SignInComponent from "../auth/signin/components/signin.component";
import SignUpComponent from "../auth/signup/component/signup.component";
import NotFound from "../components/notfound.component";
import CartComponent from "../order/cart/components/cart.component";
import HomeComponent from "../products/home/components/home.component";
import ProductDetailComponent from "../products/productdetail/components/productdetail.component";

export const routers = [
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
    path: "/cart",
    page: CartComponent,
    isShowHeader: true,
  },

  {
    path: "/sign-in",
    page: SignInComponent,
    isShowHeader: false,
  },

  {
    path: "/sign-up",
    page: SignUpComponent,
    isShowHeader: false,
  },

  {
    path: "*",
    page: NotFound,
  },
];
