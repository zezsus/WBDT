/** @format */

import SystemManagementCompoent from "../admin/components/systemManagement.component";
import SignInComponent from "../auth/signin/components/signin.component";
import SignUpComponent from "../auth/signup/component/signup.component";
import NotFound from "../components/notfound.component";
import ProfileComponent from "../navigator/profile/components/profile.component";
import BuyComponent from "../order/buy/components/buy.component";
import CartComponent from "../order/cart/components/cart.component";
import AllOrderDetailComponent from "../order/orders/component/allOrderDetaile.component";
import OrderDetailComponent from "../order/orders/component/orderDetail.component";
import HomeComponent from "../products/home/components/home.component";
import ProductDetailComponent from "../products/productdetail/components/productdetail.component";

export const routers = [
  {
    path: "/",
    page: HomeComponent,
    isShowHeader: true,
  },

  {
    path: "/product-detail/:id",
    page: ProductDetailComponent,
    isShowHeader: true,
  },

  {
    path: "/cart",
    page: CartComponent,
    isShowHeader: true,
  },

  {
    path: "/buy",
    page: BuyComponent,
    isShowHeader: true,
  },

  {
    path: "/order-detail",
    page: OrderDetailComponent,
    isShowHeader: true,
  },

  {
    path: "/all-order-detail",
    page: AllOrderDetailComponent,
    isShowHeader: true,
  },

  {
    path: "/profile",
    page: ProfileComponent,
    isShowHeader: true,
  },

  {
    path: "/system-management",
    page: SystemManagementCompoent,
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
