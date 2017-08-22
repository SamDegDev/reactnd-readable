import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories => ({ type: RECEIVE_CATEGORIES, categories });
export const fetchCategories = () => dispatch => {
    ReadableAPI
        .fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
};