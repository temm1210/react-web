import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import * as ActionTypes from 'store/actionTypes';

export const setComment = createAction(ActionTypes.SET_COMMENT);
export const setCommentSuccess = createAction(ActionTypes.SET_COMMENT_SUCCESS); 
export const setCommentFailure = createAction(ActionTypes.SET_COMMENT_FAILURE);

const initialState = Map({
    currentCommentData:List(),
    msg:""
})

export default handleActions({
    [ActionTypes.SET_COMMENT_SUCCESS]: (state, action) => {
        const { commentData,msg } = action.payload;
        return state.set("currentCommentData",commentData)
                    .set("msg",msg);
    },
    [ActionTypes.SET_COMMENT_FAILURE]: (state, action) => (
        state.set("currentCommentData",{})
             .set("msg", action.payload)
    )
}, initialState);