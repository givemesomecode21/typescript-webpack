import * as types from "./cartTypes";

export const addCartRequest = payload => ({
    type: types.CART_ADD_ITEM_REQUEST,
    payload
});

export const addCartItem = payload => ({
    type: types.CART_ADD_ITEM,
    payload
});

export const removeCartItem = payload => ({
    type: types.CART_REMOVE_ITEM,
    payload
});

export const saveShippingAddress = payload => ({
    type: types.CART_SAVE_SHIPPING_ADDRESS,
    payload
});

export const savePaymentMethod = payload => ({
    type: types.CART_SAVE_PAYMENT_METHOD,
    payload
});

export const clearCartItems = () => ({
    type: types.CART_CLEAR_ITEMS,
});

