import { RECEIVE_ALL_POSTS, RECEIVE_POSTS_WITH_CATEGORY, CHANGE_POSTS_SORTING } from '../actions/index';

const initialPostsState = {
  sorting: 'top',
  list: []
}

export default function posts(state = initialPostsState, action) {
  const { posts } = action;

  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return {
        ...state,
        list: posts,
      };
    case RECEIVE_POSTS_WITH_CATEGORY:
      return {
        ...state,
        list: posts,
      };
    case CHANGE_POSTS_SORTING:
      return {
        ...state,
        sorting: action.sorting
      }
    default:
      return state;
  }
}