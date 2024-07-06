/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUser, updateUser } from "../services/user.service";

export const useGetALlUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAllUser,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, userData, accessToken }) => {
      return updateUser(userId, userData, accessToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userDetail", data._id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id, accessToken) => deleteUser(id, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
