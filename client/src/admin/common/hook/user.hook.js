/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUser } from "../services/user.services";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, accessToken }) => deleteUser(userId, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

export const useGetALlUser = (page, accessToken) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getAllUser(page, accessToken),
  });
};
