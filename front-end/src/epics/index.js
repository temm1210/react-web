import { combineEpics } from 'redux-observable';
// import { questionListEpic, writeQuestionEpic, getQuestionEpic} from './question';
import * as questionEpics from './questionEpics';
import * as authEpics from './authEpics';
import * as commentEpics from './commentEpic';

export default combineEpics(
    // questionListEpic,
    // writeQuestionEpic,
    // getQuestionEpic
    ...Object.values(questionEpics),
    ...Object.values(authEpics),
    ...Object.values(commentEpics)
);