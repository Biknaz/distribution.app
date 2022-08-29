import api from "../api";
import { toastShow } from "./global";

export const removeOrderItem = (id: number) => {
  return api
    .delete("/order/item", {
      params: {
        id,
      },
    })
    .then((res) => res.data)
    .catch((e) =>
      toastShow({
        type: "error",
        title: "Что то пошло не так",
        message: e.message || e.res.data.message,
      })
    );
};
