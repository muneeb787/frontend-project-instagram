import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const createAxiosInstance = (token) => {
  const http = axios.create({
    baseURL: "https://backend-project-instragram.onrender.com",
    // headers: { Authorization: "Bearer " + token },
  });

  http.interceptors.request.use(
    (config) => {
      config.headers.Authorization = "Bearer " + token;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (response) => response,
    (error) => {
      const { data, status } = error.response;
      console.log(status, "error.responseerror.responseerror.response");

      if (status === 401) {
        console.log("Unautherized");
        localStorage.setItem("token", "");
        Navigate("/login");
      }

      if (status == 500) {
        toast.error(data.message);
      }

      return Promise.reject(error);
    }
  );

  return http;
};

const useAxios = () => {
  const token = localStorage.getItem("token");
  // console.log(token, "tokentokentokentoken");
  return createAxiosInstance(token);
};

export default useAxios;
