import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import categories from './categories';
import posts from './posts';

const rootReducer = combineReducers({
  categories,
  posts,
  form: formReducer,
});

export default rootReducer;