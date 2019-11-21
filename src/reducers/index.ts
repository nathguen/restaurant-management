import { combineReducers } from 'redux';
import items, { ItemsState, defaultItemsState } from './items';
import orders, { OrdersState, defaultOrdersState } from './orders';
import recipes, { RecipesState, defaultRecipesState } from './recipes';


export interface RootState {
  items: ItemsState,
  orders: OrdersState,
  recipes: RecipesState
}

export default combineReducers({
  items,
  orders,
  recipes
});

export const defaultState: RootState = {
  items: defaultItemsState,
  orders: defaultOrdersState,
  recipes: defaultRecipesState
};
