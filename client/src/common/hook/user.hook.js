/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUser, getAllUser, updateUser } from "../services/user.service";

export const useGetALlUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAllUser,
  });
};

export const useGetDetailUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: (id) => getAllUser(id),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation((id, user) => updateUser(id, user), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
