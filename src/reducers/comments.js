import { RECEIVE_ALL_COMMENTS_WITH_POST, CHANGE_COMMENTS_SORTING, RECEIVE_COMMENT_BY_ID } from '../actions/index';

const initialPostsState = {
  sorting: 'top',
  list: [],
  selected: null,
}

export default function comments(state = initialPostsState, action) {

  switch (action.type) {
    case RECEIVE_ALL_COMMENTS_WITH_POST:
      const { comments } = action;
      return {
        ...state,
        list: comments,
      }
    case CHANGE_COMMENTS_SORTING:
      const sorting  =
        ['new', 'top'].includes(action.sorting)
          ? action.sorting
          : null;
      return {
        ...state,
        sorting
      }
    case RECEIVE_COMMENT_BY_ID:
      const { comment } = action;
      return {
        ...state,
        selected: comment,
      }
    default:
      return state;
  }
}