import { Order } from "../types";
import { GenericHttpResponse } from ".";

interface FetchOrdersResponse extends GenericHttpResponse {
    data: Order[];
}

export async function fetchOrders(): Promise<FetchOrdersResponse> {
    const resp = await fetch('https://demo5544737.mockable.io/orders', {
        headers: {
            accept: 'application/json'
        }
    });

    let orders: Order[] = [];

    if (resp.ok) {
        const data = await resp.json();
        orders = data.orders;
    }
    
    return {
        ok: resp.ok,
        status: resp.status,
        statusText: resp.statusText,
        data: orders
    };
}