import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { 
    HomePage,
    LoginPage,
    JoinPage,
    QuestionListPage,
    QuestionReadPage,
    QuestionWritePage,
    PostListPage
} from 'pages';

export default ( props ) => {
    const { isLogged } = props;
    console.log('isLogged1:',isLogged)
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/questionlist" component={QuestionListPage} />
                <Route exact path="/questionget/:id" component={QuestionReadPage} />
                {/* <Route exact path="/questionwrite" component={QuestionWritePage} /> */}
                <PrivateRoute path="/questionwrite" isLogged={isLogged} component={QuestionWritePage}/>
                <Route path="/login" component={LoginPage} />
                <Route path="/join" component={JoinPage} />
                <Route Path="/post" component={PostListPage} />
            </Switch>                                                   
        </div>
    )
}

function PrivateRoute({ component: Component, isLogged, ...rest }) {
    console.log('isLogged2:',isLogged)
    return (
      <Route
        {...rest}
        render={props =>
            isLogged ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
                // state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
