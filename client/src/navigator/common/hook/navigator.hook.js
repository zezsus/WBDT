/** @format */

import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../services/navigator.service";

export const useGetDetailUser = (id, accessToken) => {
  return useQuery({
    queryKey: ["userDetail", id, accessToken],
    queryFn: () => {
      return getDetailUser(id, accessToken);
    },
  });
};
