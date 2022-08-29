import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILogin, IUser } from "../../interfaces/interfaces";
import { getUserByToken, loginService, _Toast } from "../../services";
import { globalAction } from "./global.slices";

const clearStorage = async () => {
  await AsyncStorage.removeItem("token");
};

export const userSet = (user: IUser) => async (dispatch: any) => {
  dispatch(globalAction.setUser({ user }));
};

export const loginByPassword = (params: ILogin) => async (dispatch: any) => {
  return loginService(params)
    .then(({ user, jwt }) => {
      dispatch(userSet(user));
      dispatch(login({ token: jwt }));
    })
    .then(() => _Toast.success("Вы успешно авторизовались"))
    .catch((e) => _Toast.error(e));
};

export const autoLogIn = () => async (dispatch: any) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    return getUserByToken()
      .then((user) => {
        dispatch(userSet(user));
        dispatch(globalAction.logIn({ token }));
      })
      .catch((e) => {
        _Toast.error(e);

        if (e.response?.status === 404) {
          dispatch(userLogout());
        }
      });
  }
};

export const login = (data: any) => async (dispatch: any) => {
  await AsyncStorage.setItem("token", data.token ? data.token : "");

  dispatch(globalAction.logIn({ ...data }));
};

export const userLogout = () => async (dispatch: any) => {
  clearStorage();
  dispatch(globalAction.logOut());
};
