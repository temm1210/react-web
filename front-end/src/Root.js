import React from 'react'
import App from 'components/App';
import { connect } from 'react-redux';
import { BrowserRouter, HashRouter} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Pagination from 'components/common/Pagination';
import { bindActionCreators } from 'redux';
import QuestionList from 'components/question/QuestionList';
import * as authActions from 'store/reducers/auth';
import HomePage from 'pages/home/HomePage';
import QuestionListPage from 'pages/question/QuestionListPage';
import QuestionWritePage from 'pages/question/QuestionWritePage';

class Root extends React.Component {

    render(){
        const theme = createMuiTheme({
            typography: {
                useNextVariants: true,
                suppressDeprecationWarnings: true
            }
        });
        
        const username = localStorage.getItem('username');
        const { isLogged, AuthActions } = this.props;

        if(username){
            AuthActions.loginSuccess(username)
            // store.dispatch({type:ActionTypes.LOGIN_SUCCESS, payload:username})
        }
        return (
            <HashRouter>        
                <MuiThemeProvider theme={theme}>
                    {/* <QuestionListPage/> */}
                    {/* <QuestionReadContainer /> */}
                    <App isLogged={isLogged}/>
                    {/* <QuestionWritePage/> */}
                    {/* <QuestionList/> */}
                    {/* <div>
                        <span>성능테스트1</span>
                    </div>
                    <div>
                        <span>성능테스트2</span>
                        <Pagination path="questionlist" limit={10}/>
                    </div> */}
                    {/* <HomePage/> */}
                </MuiThemeProvider>
            </HashRouter>
        )
    }
}

export default connect(
    (state) => ({
        isLogged: state.auth.getIn(['login','isLogged'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(Root)
