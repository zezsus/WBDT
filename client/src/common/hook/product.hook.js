/** @format */

import {
  getAllProduct,
  getBrandProduct,
  getDetailProduct,
  getTypeProduct,
} from "../services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProduct = (page, search, type, brand, price) => {
  return useQuery({
    queryKey: ["products", { page, search, type, brand, price }],
    queryFn: getAllProduct,
  });
};

export const useGetTypeProduct = () => {
  return useQuery({
    queryKey: ["typeProduct"],
    queryFn: getTypeProduct,
  });
};

export const useGetBrandProduct = () => {
  return useQuery({
    queryKey: ["brandProduct"],
    queryFn: getBrandProduct,
  });
};

export const useGetDetailProduct = (idProduct) => {
  return useQuery({
    queryKey: ["detailProduct", idProduct],
    queryFn: () => getDetailProduct(idProduct),
  });
};
