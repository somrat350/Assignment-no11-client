import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_LINK,
});

const useAxios = () => {
  return instance;
};

export default useAxios;
