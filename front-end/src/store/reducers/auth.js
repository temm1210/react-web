import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as ActionTypes from 'store/actionTypes';

//액션생성함수
export const join         = createAction(ActionTypes.JOIN);
export const login        = createAction(ActionTypes.LOGIN);
export const loginSuccess = createAction(ActionTypes.LOGIN_SUCCESS)
export const loginFailure = createAction(ActionTypes.LOGIN_FAILURE);
export const logout       = createAction(ActionTypes.LOGOUT)
 
//초기상태값
const initialState = Map({
    login:Map({
        username:'',
        isLogged:false,
        errorMsg:''
    }),
    join:Map({
        status:'',
        error:''
    })
});


//리듀서
export default handleActions({
    [ActionTypes.LOGIN_SUCCESS]: (state, action) => {
        const {payload: username } = action;
        return state.setIn(['login','username'], username)
                    .setIn(['login','isLogged'], true)
                    .setIn(['login', 'errorMsg'], '')
    },
    [ActionTypes.LOGIN_FAILURE]: (state, action) => {
        const {payload: errorMsg } = action;
        return state.setIn(['login','errorMsg'], errorMsg)
    },
    [ActionTypes.LOGOUT]: (state, action) => (
        state.setIn(['login','username'], '')
             .setIn(['login','isLogged'], false)
    )

}, initialState);