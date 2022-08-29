import { IOrder } from "../../interfaces/interfaces";
import { getAllService, getOneService, _Toast } from "../../services";
import { ordersAction } from "./order.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "order")
      .then((res) => {
        dispatch(setOrders(res.count, res.data));
      })
      .catch((e) => {
        _Toast.error(e);
      });
  };

export const setOrders =
  (count: number = 0, orders: IOrder[] = []) =>
  (dispatch: any) => {
    return dispatch(
      ordersAction.setOrders({
        orders,
        count,
      })
    );
  };

export const setEmptyOrders = () => (dispatch: any) => {
  return dispatch(ordersAction.setEmptyOrders());
};

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "order")
    .then((order) => {
      dispatch(setOrder(order));
    })
    .catch((e) => {
      _Toast.error(e);
    });
};

export const setOrder =
  (order: IOrder | null = null) =>
  (dispatch: any) => {
    return dispatch(
      ordersAction.setOrder({
        order,
      })
    );
  };
