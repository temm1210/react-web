import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as ActionTypes from 'store/actionTypes';

const setComment = createAction(ActionTypes.SET_COMMENT);

const initialState = Map({
    currentData:Map({})
})

export default handleActions({
    [ActionTypes.SET_COMMENT_SUCCESS]: (state, action) => {
        const comment = action.payload;
        return state.set("currentData",comment);
    },
    [ActionTypes.SET_COMMENT_FAILURE]: (state, action) => {

    }
})


//액션을 바로 데이터 가져오는걸 설정해서 redux-form의 load나 connect의 state에 설정하는게 어떨까?
// https://redux-form.com/7.4.2/examples/initializefromstate/참조해서 load함수를 onMountDId함수에 적용해
// 고쳐놧으니 커밋 하지마 망할놈아 