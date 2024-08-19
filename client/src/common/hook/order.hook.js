/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getAllOrderDetail,
  getDetailOrder,
  updateOrder,
} from "../services/order.service";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newOrder, userId, accessToken }) => {
      return createOrder(newOrder, userId, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useGetDetailOrder = (orderId) => {
  return useQuery({
    queryKey: ["detailOrder", orderId],
    queryFn: () => {
      return getDetailOrder(orderId);
    },
  });
};

export const useGetAllDetailOrder = ({ userId, accessToken }) => {
  return useQuery({
    queryKey: ["detailAllOrder", { userId, accessToken }],
    queryFn: () => {
      return getAllOrderDetail(userId, accessToken);
    },
  });
};

export const useGetAllOrder = (page) => {
  return useQuery({
    queryKey: ["orders", page],
    queryFn: () => {
      return getAllOrder(page);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, orderId, accessToken }) => {
      return deleteOrder(userId, orderId, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["detailAllOrder"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, updateData, accessToken }) => {
      return updateOrder(userId, updateData, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["detailAllOrder"] });
    },
  });
};
