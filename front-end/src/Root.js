import React from 'react'
import App from 'components/App';
import { connect } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { bindActionCreators } from 'redux';
import * as authActions from 'store/reducers/auth';

import QuestionReadContainer from 'containers/question/QuestionReadContainer';
import QuestionWriteContainer from 'containers/question/QuestionWriteContainer';

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
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    {/* <QuestionReadContainer /> */}
                    <App isLogged={isLogged}/> 
                </MuiThemeProvider>
            </BrowserRouter>
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


