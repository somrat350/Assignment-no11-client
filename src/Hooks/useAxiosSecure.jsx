import axios from "axios";
import useAuth from "./useAuth";

const instanceSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_LINK,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  instanceSecure.interceptors.request.use((config) => {
    config.headers.authorization = user?.accessToken;
    return config;
  });
  return instanceSecure;
};

export default useAxiosSecure;
