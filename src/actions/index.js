import * as ReadableAPI from '../utils/ReadableAPI';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = categories => ({ type: GET_CATEGORIES, categories });
export const fetchCategories = () => dispatch => (
    ReadableAPI
        .fetchCategories()
        .then(categories => dispatch(getCategories(categories)))
  );