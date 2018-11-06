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

  let routeElement;

  if(isLogged) {
    routeElement =
      <Route 
        {...rest} 
        render= {() =>(
          <Component />
        )} 
      />
  } else {
    routeElement = window.confirm("로그인이 필요한 서비스입니다. 로그인하시겠습니까?") ?
        (
          <Route 
            {...rest} 
            render= {() =>(
              <Redirect to={{pathname: "/login"}}/>
            )} 
          />
        ) :
        null
  }

  return routeElement;
}
