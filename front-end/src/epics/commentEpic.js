import { from, of } from 'rxjs';
import { pluck, switchMap,mergeMap, tap, concat,startWith, catchError} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as api from 'services/api';
import * as ActionTypes from 'store/actionTypes/';
import * as loadingActions from 'store/reducers/loading';
import * as commentActions from 'store/reducers/comment';
import * as questionActions from 'store/reducers/question';

export const postComment = (action$, store) => {
    return action$
        .pipe(
            ofType(ActionTypes.SET_COMMENT),
            pluck('payload'),
            tap(data => console.log('data:',data)),
            switchMap(({id, comment}) => from(api.writeComment(id, comment))
                .pipe(
                    pluck('data'),
                    tap(response => console.log('postComment:',response)),
                    mergeMap(({ questionData }) => [
                        commentActions.setCommentSuccess(questionData.comments),
                        questionActions.getEndQuestion(questionData)
                    ]),
                    startWith(loadingActions.loadingStart()),
                    catchError(err => of(commentActions.setCommentFailure(err))),
                    concat([loadingActions.loadingEnd()])
                )
            
            )
        )
}