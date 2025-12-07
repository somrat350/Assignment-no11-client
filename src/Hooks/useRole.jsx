import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const instanceSecure = useAxiosSecure();

  const { isLoading, data: role = "donor" } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instanceSecure.get(`/currentUser?email=${user?.email}`);
      return res.data.role;
    },
  });
  return { role, isLoading };
};

export default useRole;
