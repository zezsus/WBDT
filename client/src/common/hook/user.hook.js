/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/user.service";

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
