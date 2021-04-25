import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "./cartTypes";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x: any) => x.id === item.id);
      if (existItem) {
        const cartItems = state.cartItems.map((x: any) =>
          x.id === item.id
            ? {
                ...item,
                quantity: item.quantity ? item.quantity : ++x.quantity,
              }
            : x
        );
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return {
          ...state,
          cartItems,
        };
      } else {
        const cartItems = [...state.cartItems, { ...item, quantity: 1 }];
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return {
          ...state,
          cartItems,
        };
      }
    case CART_REMOVE_ITEM:
      const cartItems = state.cartItems.filter(
        (x: any) => x.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cartItems,
      };
    case CART_CLEAR_ITEMS:
      localStorage.removeItem("cartItems");
      return {
        ...state,
        cartItems: [],
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
