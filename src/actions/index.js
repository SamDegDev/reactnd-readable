import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';

export const receiveAllCategories = categories => ({ type: RECEIVE_ALL_CATEGORIES, categories });
export const fetchAllCategories = () => dispatch => {
    ReadableAPI
        .fetchAllCategories()
        .then(categories => dispatch(receiveAllCategories(categories)))
};

export const receiveAllPosts = posts => ({ type: RECEIVE_ALL_POSTS, posts });
export const fetchAllPosts = () => dispatch => {
    ReadableAPI
        .fetchAllPosts()
        .then(posts => dispatch(receiveAllPosts(posts)))
};