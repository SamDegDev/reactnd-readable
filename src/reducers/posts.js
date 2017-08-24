import { RECEIVE_ALL_POSTS, RECEIVE_POSTS_WITH_CATEGORY } from '../actions/index';

const initialPostsState = {
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
    default:
      return state;
  }
}