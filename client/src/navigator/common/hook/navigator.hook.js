/** @format */

import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../services/navigator.service";

export const useGetDetailUser = (userId, accessToken) => {
  return useQuery({
    queryKey: ["userDetail", userId],
    queryFn: () => getDetailUser(userId, accessToken),
  });
};
