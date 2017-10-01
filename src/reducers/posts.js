import {
  RECEIVE_ALL_POSTS,
  RECEIVE_POSTS_WITH_CATEGORY,
  CHANGE_POSTS_SORTING,
  RECEIVE_POST_BY_ID,
  CREATE_POST,
  DELETE_POST,
  CLEAR_SELECTED_POST,
  EDIT_POST,
  RECEIVE_ALL_COMMENTS_WITH_POST,
  CHANGE_COMMENTS_SORTING,
  RECEIVE_COMMENT_BY_ID,
} from '../actions/index';

const initialPostsState = {
  sorting: 'top',
  commentsSorting: 'top',
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
    case EDIT_POST:
      return {
        ...state,
      }
    case RECEIVE_ALL_COMMENTS_WITH_POST:
      const { comments } = action;
      let postsList = state.list;
      postsList.map(post => {
        if (!post.comments) {
          post.comments = [];
        }
        post.comments = [
            ...post.comments,
            ...comments.filter(comment => comment.parentId === post.id)
        ];
        return post;
      });
      let postSelected = state.selected;
      if (postSelected) {
        if (!postSelected.comments) {
          postSelected.comments = [];
        }
        postSelected.comments = [
            ...postSelected.comments,
            ...comments.filter(comment => comment.parentId === postSelected.id)
        ];
      }
      return {
        ...state,
        list: [
          ...postsList
        ],
        selected: {
          ...state.selected,
          ...postSelected
        }
      }
    case CHANGE_COMMENTS_SORTING:
      const commentsSorting  =
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