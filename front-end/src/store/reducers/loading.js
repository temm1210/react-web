import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as ActionTypes from 'store/actionTypes/';

// const LOADING_START = 'loading/LOADING_START';
// const LOADING_END = 'loading/LOADING_END'

export const loadingStart = createAction(ActionTypes.LOADING_START);
export const loadingEnd   = createAction(ActionTypes.LOADING_END);

const initialState = Map({
    loading: false
});

export default handleActions({
    [ActionTypes.LOADING_START] : (state, action) => state.set('loading', true),
    [ActionTypes.LOADING_END]   : (state, action) => state.set('loading', false)  
}, initialState)

