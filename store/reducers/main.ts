import { products } from "../../constants/products";
import * as t from "../types";
import { actionI, initialStateI, shoppingCartProductI } from "./main.types";

const initialState: initialStateI = {
  products,
  shoppingCart: [],
};

const main = (state = { ...initialState }, action: actionI) => {
  let { type, payload } = action;
  switch (type) {
    case t.ADD_PRODUCT_SHOP_CART:
      let returnProduct: shoppingCartProductI[];
      const { code, quantity } = payload;

      let addedProduct = state.products.find(
        (product) => product.code === code
      );

      let existedProduct = state.shoppingCart.find(
        (product) => code === product.code
      );

      if (existedProduct !== undefined) {
        let productIndex = state.shoppingCart.findIndex(
          (product) => product.code === code
        );

        returnProduct = [...state.shoppingCart];
        returnProduct[productIndex] = {
          ...returnProduct[productIndex],
          quantity: existedProduct.quantity + quantity,
        };
      } else {
        returnProduct = [
          ...state.shoppingCart,
          { ...addedProduct!, quantity: quantity },
        ];
      }
      return {
        ...state,
        shoppingCart: [...returnProduct],
      };
    case t.CLEAR_SHOP_CART:
      return {
        ...state,
        shoppingCart: [],
      };
    case t.REMOVE_PRODUCT_SHOP_CART:
      let newArrProductsShopCart: shoppingCartProductI[];
      let productShopCart = state.shoppingCart.find(
        (product) => product.code === payload
      );

      let productIndex = state.shoppingCart.findIndex(
        (product) => product.code === payload
      );

      if (productShopCart!.quantity === 1) {
        newArrProductsShopCart = state.shoppingCart.filter(
          (product) => product.code !== payload
        );
      } else {
        newArrProductsShopCart = state.shoppingCart.map((product, i) => {
          if (i === productIndex) {
            product.quantity -= 1;
          }
          return product;
        });
      }

      return {
        ...state,
        shoppingCart: [...newArrProductsShopCart],
      };
    default:
      return { ...state };
  }
};

export default main;
