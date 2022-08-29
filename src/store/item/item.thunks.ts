import { IItem } from "../../interfaces/interfaces";
import { getAllService, getOneService, _Toast } from "../../services";
import { itemsAction } from "./item.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "item")
      .then((res) => {
        dispatch(setItems(res.count, res.data));
      })
      .catch((e) => {
        _Toast.error(e);
      });
  };

export const setItems =
  (count: number = 0, items: IItem[] = []) =>
  (dispatch: any) => {
    return dispatch(
      itemsAction.setItems({
        items,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "item")
    .then((item) => {
      dispatch(setItem(item));
    })
    .catch((e) => {
      _Toast.error(e);
    });
};

export const setItem =
  (item: IItem | null = null) =>
  (dispatch: any) => {
    return dispatch(
      itemsAction.setItem({
        item,
      })
    );
  };
