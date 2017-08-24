import { RECEIVE_ALL_CATEGORIES } from '../actions/index';

export default function categories(state = [], action) {
  switch (action.type) {
    case RECEIVE_ALL_CATEGORIES:
      const { categories } = action;
      return [
        ...state,
        ...categories,
      ];
    default:
      return state;
  }
}