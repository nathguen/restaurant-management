import { RootState } from ".";
import { SET_ORDERS, OrdersActions } from "../redux/orders";
import { Order } from "../types";

export type OrdersState = {
    orders: Order[]
};

export const defaultOrdersState: OrdersState = {
    orders: []
};

// fix action type
function ordersReducer(state = defaultOrdersState, action: OrdersActions): OrdersState {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            };

        default:
            return state;
    }
}

export default ordersReducer;


export function getOrders(state: RootState): Order[] {
    return state.orders.orders;
}

export function getOrdersByRecipeId(id: number, state: RootState): Order[] {
    return getOrders(state).filter(order => order.recipe === id);
}