import { fetchOrders as fetchOrdersFromAPI } from "../api/orders";
import { Dispatch } from "redux";
import { Order } from "../types";

export const SET_ORDERS = 'SET_ORDERS';

interface SetOrdersAction {
    type: string
    orders: Order[]
}

export interface OrdersActions extends
    SetOrdersAction {
}

export function setOrders(orders: Order[]): SetOrdersAction {
    return {
        type: SET_ORDERS,
        orders
    };
}


export function fetchOrders() {
    return async (dispatch: Dispatch) => {
        const resp = await fetchOrdersFromAPI();

        if (resp.ok) {
            dispatch(setOrders(resp.data))
        }

        return resp;
    };
}