import {
  RECEIVE_ALL_POSTS,
  RECEIVE_POSTS_WITH_CATEGORY,
  CHANGE_POSTS_SORTING,
  RECEIVE_POST_BY_ID,
  CREATE_POST,
  DELETE_POST,
  CLEAR_SELECTED_POST,
  EDIT_POST,
  VOTE_POST,
  RECEIVE_ALL_COMMENTS_WITH_POST,
  CHANGE_COMMENTS_SORTING,
  RECEIVE_COMMENT_BY_ID,
  CLEAR_SELECTED_COMMENT,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
} from '../actions/index';

const initialPostsState = {
  sorting: 'top',
  commentsSorting: 'top',
  selectedComment: null,
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
        selected: action.post,
      }
    case VOTE_POST:
      return {
        ...state,
        list: state.list.map(post =>
          post.id === action.post.id
            ? action.post
            : post
        ),
        selected: state.selected === null ? null : action.post
      }
    case RECEIVE_ALL_COMMENTS_WITH_POST:
      const { comments, postId } = action;
      let postsList = state.list;
      postsList.map(post => {
        if (post.id === postId) {
          post.comments = comments;
        }
        return post;
      });
      let postSelected = state.selected;
      if (postSelected !== null && postSelected['id']) {
        postSelected.comments = comments;
      }
      return {
        ...state,
        list: [
          ...postsList
        ],
        selected: postSelected
      }
    case CHANGE_COMMENTS_SORTING:
      const commentsSorting  =
        ['new', 'top'].includes(action.sorting)
          ? action.sorting
          : null;
      return {
        ...state,
        commentsSorting
      }
    case RECEIVE_COMMENT_BY_ID:
      const { comment } = action;
      return {
        ...state,
        selectedComment: comment,
      }
    case CLEAR_SELECTED_COMMENT:
      return {
        ...state,
        selectedComment: null,
      }
    case EDIT_COMMENT:
      let newCommentsArray = [];
      state.selected.comments.map(comment =>
        newCommentsArray.push(comment.id === action.comment.id
          ? action.comment
          : comment));
      return {
        ...state,
        selected: {
          ...state.selected,
          comments: newCommentsArray,
        }
      }
    case CREATE_COMMENT:
      return {
        ...state
      }
    case DELETE_COMMENT:
      return {
        ...state,
      }
    case VOTE_COMMENT:
      return {
        ...state,
        selected: {
          ...state.selected,
          comments: state.selected.comments.map(comment =>
            comment.id === action.comment.id
              ? action.comment
              : comment
          )
        }
      }
    default:
      return state;
  }
}