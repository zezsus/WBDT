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

export const useGetALlUser = (accessToken) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(accessToken),
  });
};
