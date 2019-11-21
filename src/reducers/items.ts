import { RootState } from ".";
import { SET_ITEMS, ItemsActions } from "../redux/items";
import { Item } from "../types";

export type ItemsState = {
    [key: number]: Item
};

export const defaultItemsState: ItemsState = {};

// fix action type
function itemsReducer(state = defaultItemsState, action: ItemsActions): ItemsState {
    switch (action.type) {
        case SET_ITEMS:
            return action.items.reduce((map, item) => {
                map[item.id] = item;
                return map;
            }, {} as ItemsState);

        default:
            return state;
    }
}

export default itemsReducer;


export function getItemsState(state: RootState): ItemsState {
    return state.items;
}

export function getItemById(id: number, state: RootState): Item {
    return getItemsState(state)[id];
}