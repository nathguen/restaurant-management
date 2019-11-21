import { fetchItems as fetchItemsFromAPI } from "../api/items";
import { Dispatch } from "redux";
import { Item } from "../types";

export const SET_ITEMS = 'SET_ITEMS';

interface SetItemsAction {
    type: string;
    items: Item[]
}

export interface ItemsActions extends
    SetItemsAction {
}

export function setItems(items: Item[]): SetItemsAction {
    return {
        type: SET_ITEMS,
        items
    };
}


export function fetchItems() {
    return async (dispatch: Dispatch) => {
        const resp = await fetchItemsFromAPI();

        if (resp.ok) {
            dispatch(setItems(resp.data))
        }

        return resp;
    };
}