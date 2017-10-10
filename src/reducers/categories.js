import { RECEIVE_ALL_CATEGORIES, CHANGE_SELECTED_CATEGORY } from '../actions/index';

const initialCategoriesState = {
  selected: 'all',
  list: []
}

export default function categories(state = initialCategoriesState, action) {
  switch (action.type) {
    case RECEIVE_ALL_CATEGORIES:
      const { categories } = action;
      return {
        ...state,
        list: [...categories],
        };
    case CHANGE_SELECTED_CATEGORY:
        let { category } = action
        category = category !== undefined ? category : 'all' ;
        return {
          ...state,
          selected: category,
        }
    default:
      return state;
  }
}