import { from,of } from 'rxjs';
import { pluck, switchMap, tap, map, mergeMap,concat, startWith,catchError } from 'rxjs/operators';
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
            tap(data => console.log('getQuestion')),
            switchMap(questionId => from(api.getQuestion(questionId))
                .pipe(
                    tap(response => console.log('response:',response.data)),
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
            pluck('payload'),
            switchMap(({page,limit}) => from(api.getQuestionList(page,limit))
                .pipe(
                    pluck('data'),
                    tap((data) => console.log('data:',data)),
                    mergeMap(({questionList, totalCount}) => of(
                        questionActions.setQuestionList(questionList),
                        questionActions.setTotalCount(totalCount),
                    )),
                    // map(response => questionActions.setQuestionList(response.data)),
                    startWith(loadingActions.loadingStart()),           
                    concat([loadingActions.loadingEnd()])
                )
            )
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
    return action$
        .pipe(
            ofType(ActionTypes.DELTE_QUESTION),
            pluck('payload'),
            switchMap(id => from(api.deleteQuestion(id))
                .pipe(
                    pluck('data'),
                    map(response => {
                        const { status, msg, deletedData } = response;

                        return status === 200 ?
                            questionActions.deleteQuestionSuccess({deletedData,msg}) :
                            questionActions.deleteQuestionFailure(msg) 
                    }),
                    startWith(loadingActions.loadingStart()),
                    catchError(err => of(err)),
                    concat([loadingActions.loadingEnd()])
                )
            )
        )
}


