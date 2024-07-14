/** @format */

import { getAllProduct } from "../services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProduct = (page, search, type, company, price) => {
  return useQuery({
    queryKey: ["products", { page, search, type, company, price }],
    queryFn: getAllProduct,
  });
};
