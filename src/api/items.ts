import { Item } from "../types";
import { GenericHttpResponse } from ".";

interface FetchItemsResponse extends GenericHttpResponse {
    data: Item[];
}

export async function fetchItems(): Promise<FetchItemsResponse> {
    const resp = await fetch('https://demo5544737.mockable.io/items', {
        headers: {
            accept: 'application/json'
        }
    });

    let items: Item[] = [];

    if (resp.ok) {
        const data = await resp.json();
        items = data.itens;
    }
    
    return {
        ok: resp.ok,
        status: resp.status,
        statusText: resp.statusText,
        data: items
    };
}