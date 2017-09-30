import {
  RECEIVE_ALL_POSTS,
  RECEIVE_POSTS_WITH_CATEGORY,
  CHANGE_POSTS_SORTING,
  RECEIVE_POST_BY_ID,
  CREATE_POST,
  DELETE_POST,
  CLEAR_SELECTED_POST,
} from '../actions/index';

const initialPostsState = {
  sorting: 'top',
  selected: null,
  list: [],
}

export default function posts(state = initialPostsState, action) {
  const { posts } = action;

  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return {
        ...state,
        list: posts,
      }
    case RECEIVE_POSTS_WITH_CATEGORY:
      return {
        ...state,
        list: posts,
      }
    case CHANGE_POSTS_SORTING:
      const sorting  =
        ['new', 'top'].includes(action.sorting)
          ? action.sorting
          : null;
      return {
        ...state,
        sorting
      }
    case RECEIVE_POST_BY_ID:
      const { post } = action;
      return {
        ...state,
        selected: post,
      }
    case CREATE_POST:
      return {
        ...state,
        selected: action.post,
      }
    case DELETE_POST:
      return {
        ...state,
      }
    case CLEAR_SELECTED_POST:
      return {
        ...state,
        selected: null,
      }
    default:
      return state;
  }
}