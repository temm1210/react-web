import { from, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap,pluck, tap,map, startWith, concat, switchMap } from 'rxjs/operators';
import * as api from 'services/api';
import * as ActionTypes from 'store/actionTypes/';
import * as loadingActions from 'store/reducers/loading';
import * as authActions from 'store/reducers/auth';

export const loginEpic = (action$, store) => {
    return action$
        .pipe(
            ofType(ActionTypes.LOGIN),
            pluck('payload'),
            switchMap(user => from(api.login(user))
                .pipe(
                    pluck('data'),
                    map(response => {
                        const { status, username, errorMsg } = response;
                        return status === 200 && username ? 
                            authActions.loginSuccess(username) :
                            authActions.loginFailure(errorMsg);
                    }),
                    startWith(loadingActions.loadingStart()),
                    concat([loadingActions.loadingEnd()])
                )
            )

        )
}


export const joinEpic = (action$, store) => {
    return action$
        .pipe(
            ofType(ActionTypes.JOIN),
            tap(action => console.log('action.payload:',action.payload)),
            pluck('payload'),
            mergeMap(user => from(api.join(user))),
            startWith(loadingActions.loadingStart()),
            concat([loadingActions.loadingEnd()])
        )
}


