import { from } from 'rxjs';
import { pluck, switchMap, tap, map, mergeMap,concat, startWith } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as api from 'services/api';
import * as ActionTypes from 'store/actionTypes/';
import * as loadingActions from 'store/reducers/loading';
import * as questionActions from 'store/reducers/question';

export const getQuestionEpic = (action$, store) => {
    return action$
        .pipe(
            ofType(ActionTypes.GET_START_QUESTION),
            pluck('payload'),
            switchMap(questionId => from(api.getQuestion(questionId))
                .pipe(
                    mergeMap(response => [questionActions.getEndQuestion(response.data)]),
                    startWith(loadingActions.loadingStart()),           
                    concat([loadingActions.loadingEnd()])
                )
        
            )
        );
}

export const questionListEpic = (action$ , store) => {
    return action$
        .pipe(
            ofType(ActionTypes.GET_QUESTION_LIST),
            // tap(action => console.log('tap action:',action)),
            mergeMap(action => from(api.getQuestionList())
                .pipe(       
                    // tap(response => console.log('tap datas:',response)),
                    map(response => questionActions.setQuestionList(response.data)),
                    startWith(loadingActions.loadingStart()),           
                    concat([loadingActions.loadingEnd()])
                )
            ),
        );
}

export const writeQuestionEpic = (action$, store) => {
    return action$
        .pipe(
            ofType(ActionTypes.SET_QUESTION),
            tap(action => console.log('WriteEpic action:',action)),
            pluck('payload'),
            mergeMap(question => from(api.writeQuestion(question))
            // mergeMap(action => from(api.writeQuestion(action.payload))
                .pipe(
                    tap(action => console.log('action:',action)),
                    pluck('data'),
                    map(data => questionActions.getEndQuestion(data)),
                    startWith(loadingActions.loadingStart()),           
                    concat([loadingActions.loadingEnd()])                    
                )
            )
        )
}

export const deleteQuestionEpic = (action$, store) => {
    return action&
        .pipe(
            ofType(ActionTypes.deleteQuestion),
            pluch('payload')
            map(id => from(api))
        )
}

