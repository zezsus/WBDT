/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCart, deleteCart, getCart } from "../services/cart.service";

export const useCreateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data, accessToken }) => {
      return createCart(userId, data, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
};

export const useGetCart = (userId) => {
  return useQuery({
    queryKey: ["carts", userId],
    queryFn: () => getCart(userId),
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, productId, accessToken }) =>
      deleteCart(userId, productId, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
};
