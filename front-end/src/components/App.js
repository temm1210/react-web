import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { 
    HomePage,
    LoginPage,
    JoinPage,
    QuestionListPage,
    QuestionReadPage,
    QuestionWritePage
} from 'pages';

export default ( props ) => {
    const { isLogged } = props;

    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/questionlist/:page" component={QuestionListPage} />
                <Route exact path="/questionget/:id" component={QuestionReadPage} />
                <PrivateRoute path="/questionwrite" isLogged={isLogged} component={QuestionWritePage}/>
                <Route path="/login" component={LoginPage} />
                <Route path="/join" component={JoinPage} />
            </Switch>                                                   
        </div>
    )
}


const PrivateRoute = ({ component: Component,prevPath, isLogged, ...rest }) => {
  if(isLogged) {
    return(
        <Route 
          {...rest} 
          render= {() =>(
            <Component />
          )} 
        />
      )
  } else {
        return (
          <Route 
            {...rest} 
            render= {(props) =>{
              console.log('props.location:',props.location)
              return (
                <Redirect to={{
                  pathname: "/login",
                  state: { from: props.location}
              }}/>
            )}} 
          />
        )
      } 
}
