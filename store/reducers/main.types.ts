export interface productI {
  title: string;
  code: string;
  stock: number;
  description: string;
  price: number;
  inOffer: boolean;
  discount: number;
  image: string[];
  moreAbout: string;
}

export interface shoppingCartProductI {
  title: string;
  code: string;
  stock: number;
  price: number;
  inOffer: boolean;
  discount: number;
  image: string[];
  quantity: number;
}

export interface initialStateI {
  products: productI[];
  shoppingCart: shoppingCartProductI[];
}

export type AppState = {
  main: {
    products: productI[];
    shoppingCart: shoppingCartProductI[];
  };
};

export interface actionI {
  type: string;
  payload: any;
}
