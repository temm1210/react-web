import { createStore,applyMiddleware, compose } from 'redux';
import rootEpic from 'epics';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers'

export default () => {
    const epicMiddleware = createEpicMiddleware();
    const isDev = process.env.NODE_ENV === 'development';
    const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = devtools || compose;

    const store = createStore(
        rootReducer,
        // composeEnhancers(
        //     applyMiddleware(epicMiddleware)
        // )
        compose(
            applyMiddleware(epicMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
       
    );
    epicMiddleware.run(rootEpic);

    return store;
}


