import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES';
export const CHANGE_SELECTED_CATEGORY = 'CHANGE_SELECTED_CATEGORY';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POSTS_WITH_CATEGORY = 'RECEIVE_POSTS_WITH_CATEGORY';
export const CHANGE_POSTS_SORTING = 'CHANGE_POSTS_SORTING';

export const receiveAllCategories = categories => ({ type: RECEIVE_ALL_CATEGORIES, categories });
export const fetchAllCategories = () => dispatch => {
    ReadableAPI
        .fetchAllCategories()
        .then(categories => dispatch(receiveAllCategories(categories)));
};

export const changeSelectedCategory = category => ({ type: CHANGE_SELECTED_CATEGORY, category })

export const receiveAllPosts = posts => ({ type: RECEIVE_ALL_POSTS, posts });
export const fetchAllPosts = () => dispatch => {
    ReadableAPI
        .fetchAllPosts()
        .then(posts => dispatch(receiveAllPosts(posts)));
};

export const receivePostsWithCategory = posts => ({ type: RECEIVE_POSTS_WITH_CATEGORY, posts });
export const fetchPostsWithCategory = category => dispatch => {
  ReadableAPI
    .fetchPostsWithCategory(category)
    .then(posts => dispatch(receivePostsWithCategory(posts)));
}

export const changePostsSorting = sorting => ({ type: CHANGE_POSTS_SORTING, sorting })
