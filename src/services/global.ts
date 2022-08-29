import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import api from "../api";
import {
  IAuthorization,
  IAutoComplete,
  ILogin,
} from "../interfaces/interfaces";

class ToastClass {
  options = undefined;

  info(info: string) {
    return Toast.show({
      type: "info",
      text1: "Инфо",
      text2: info,
      topOffset: 50,
      bottomOffset: 40,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  }
  success(message: string) {
    return Toast.show({
      type: "success",
      text1: "Успешно",
      text2: message,
      topOffset: 50,
      bottomOffset: 40,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  }
  error(error: AxiosError<{ message?: string } | undefined>) {
    let message =
      error.response?.data?.message || error.message || "Server Side Error";
    if (Array.isArray(message)) {
      message = message.join(", ");
    }

    return Toast.show({
      type: "error",
      text1: "Что то пошло не так",
      text2: message,
      topOffset: 50,
      bottomOffset: 40,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  }

  warning(warning: string) {
    return Toast.show({
      type: "warning",
      text1: "Что то пошло не так",
      text2: warning,
      topOffset: 50,
      bottomOffset: 40,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  }
}

export const _Toast = new ToastClass();

export const loginService = (params: ILogin) => {
  return api.post("/auth/login", params).then((res) => res.data);
};

export const authorizationService = (params: IAuthorization) => {
  return api.post("/auth/regis", params).then((res) => res.data);
};

export const getUserByToken = () => {
  return api.get("/user/token").then((res) => res.data);
};

export const autoComplite = (params: IAutoComplete) => {
  return api
    .get("/global/autoComplete", {
      params,
    })
    .then((res) => res.data);
};

export const createService = (params: any, name: string) => {
  return api.post(`/${name}`, params).then((res) => res.data);
};

export const updateService = (id: number, params: any, name: string) => {
  return api.patch(`/${name}/${id}`, params).then((res) => res.data);
};

export const removeService = (id: number, name: string) => {
  return api.delete(`/${name}/${id}`).then((res) => res.data);
};

export const getOneService = (id: number, name: string) => {
  return api.get(`/${name}/${id}`).then((res) => res.data);
};

export const getAllService = (skip: number, params: any, name: string) => {
  return api
    .get(`/${name}`, {
      params: {
        skip,
        params,
      },
    })
    .then((res) => res.data);
};
