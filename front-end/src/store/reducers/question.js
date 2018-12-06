import { createAction, handleActions } from 'redux-actions';
import { List, Map} from 'immutable';
import * as ActionTypes from 'store/actionTypes/';

// 액션함수들
export const getQuestionList        = createAction(ActionTypes.GET_QUESTION_LIST);
export const getStartQuestion       = createAction(ActionTypes.GET_START_QUESTION);
export const getEndQuestion         = createAction(ActionTypes.GET_END_QUESTION);
export const setQuestionList        = createAction(ActionTypes.SET_QUESTION_LIST);
export const setQuestion            = createAction(ActionTypes.SET_QUESTION);
export const deleteQuestion         = createAction(ActionTypes.DELTE_QUESTION);
export const deleteQuestionSuccess  = createAction(ActionTypes.DELTE_QUESTION_SUCCESS);
export const deleteQuestionFailure  = createAction(ActionTypes.DELTE_QUESTION_FAILURE);
export const setTotalCount          = createAction(ActionTypes.SET_TOTAL_COUNT);

// 초기값
const initialState = Map({
    data:List(),
    currentQuestionData:Map({}),
    delete:Map({
        data:Map({}),
        msg:''
    }),
    paging:Map({
        totalCount:0
    })
});

// reducer
export default handleActions({
    [ActionTypes.SET_QUESTION_LIST]: (state, action) => {
        const questions = action.payload;
        return state.set('data', questions);
    },
    [ActionTypes.GET_END_QUESTION]: (state, action) => {
        const question = action.payload;
        return state.set('currentQuestionData', question)
    },
    [ActionTypes.DELTE_QUESTION_SUCCESS]: (state, action) => {
        const {msg, deletedData} = action.payload;
        return state.setIn(['delete','data'],deletedData)
                    .setIn(['delete','msg'], msg)
    },
    [ActionTypes.DELTE_QUESTION_FAILURE]: (state, action) => {
        const msg = action.payload;
        return state.setIn(['delete','msg'],msg)
                    
    },
    [ActionTypes.SET_TOTAL_COUNT]: (state, action) => {
        return state.setIn(['paging','totalCount'], action.payload)
    }
},initialState);