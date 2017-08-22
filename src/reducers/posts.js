import { GET_POSTS } from '../actions/index';

export default function posts(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      const { posts } = action;
      return {
        ...state,
        posts,
      };
    default:
      return state;
  }
}