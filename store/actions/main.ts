import * as t from "../types";

export const addProductToCart = (code: string, quantity = 1) => {
  return {
    type: t.ADD_PRODUCT_SHOP_CART,
    payload: { code, quantity },
  };
};

export const removeProductToCart = (code: string) => {
  return {
    type: t.REMOVE_PRODUCT_SHOP_CART,
    payload: code,
  };
};

export const clearCart = () => ({ type: t.CLEAR_SHOP_CART });
