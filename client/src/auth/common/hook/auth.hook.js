/** @format */

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { signInService, signUpService } from "../service/auth.service";

export const usePostNewtUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => signUpService(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => signInService(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
