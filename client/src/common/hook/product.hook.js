/** @format */

import {
  getAllProduct,
  getBrandProcut,
  getTypeProcut,
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
    queryFn: getTypeProcut,
  });
};

export const useGetBrandProduct = () => {
  return useQuery({
    queryKey: ["brandProduct"],
    queryFn: getBrandProcut,
  });
};
