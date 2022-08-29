import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.104:4000",
});

api.interceptors.request.use(async function (config: AxiosRequestConfig) {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    if (config.headers) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("token");
      return;
    }

    return Promise.reject(error);
  }
);

export default api;
