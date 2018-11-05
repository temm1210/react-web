import { createAction, handleActions } from 'redux-actions';
import { List, Map} from 'immutable';
import * as ActionTypes from 'store/actionTypes/';

// 액션함수들
// const GET_QUESTION_LIST = "question/GET_QUESTION_LIST"
export const getQuestionList = createAction(ActionTypes.GET_QUESTION_LIST);
export const getStartQuestion= createAction(ActionTypes.GET_START_QUESTION);
export const getEndQuestion  = createAction(ActionTypes.GET_END_QUESTION);
export const setQuestionList = createAction(ActionTypes.SET_QUESTION_LIST);
export const setQuestion     = createAction(ActionTypes.SET_QUESTION);

// 초기값
const initialState = Map({
    data:List(),
    currentData:Map({}),
});


// reducer
export default handleActions({
    [ActionTypes.SET_QUESTION_LIST]: (state, action) => {
        const questions = action.payload;
        return state.set('data', questions);
    },
    [ActionTypes.GET_END_QUESTION]: (state, action) => {
        const question = action.payload;
        return state.set('currentData', question)
    }
    // [ActionTypes.SET_QUESTION]: (state, action) => {
    //     const question = action.payload;
    //     console.log('question:',question)
    //     return state.get('data').unshift(fromJS(question))
    // }
},initialState);