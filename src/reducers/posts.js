import { RECEIVE_ALL_POSTS } from '../actions/index';

export default function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      const { posts } = action;
      return [
        ...state,
        ...posts,
      ];
    default:
      return state;
  }
}