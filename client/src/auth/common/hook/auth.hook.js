/** @format */

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { signInService, signUpService } from "../service/auth.service";

export const usePostNewtUser = () => {
  const queryClient = useQueryClient();
  return useMutation((newUser) => signUpService(newUser), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation((user) => signInService(user), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
