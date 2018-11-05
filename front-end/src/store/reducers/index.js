import { combineReducers } from 'redux';
import loading from './loading';
import question from './question';
import auth from './auth';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    form: formReducer,
    loading,
    question,
    auth
});