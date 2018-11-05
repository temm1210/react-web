import React, { Component } from 'react';
import Login from 'components/auth/Login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/reducers/auth';
import { withRouter } from 'react-router-dom';

class LoginFormContainer extends Component {

    handleSubmit = async (values) => {
        const { AuthActions } = this.props;
        AuthActions.login(values);
    }

    render() {
        const { errorMsg,isLogged,history, username} = this.props;

        if(isLogged && username) {
            localStorage.setItem('username',username)
            history.goBack();
        } else {
            localStorage.removeItem('username')
        }
        
        return (
            <div>
                <Login
                    onSubmit={this.handleSubmit}
                    errorMsg={errorMsg}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        errorMsg: state.auth.getIn(['login','errorMsg']),
        isLogged: state.auth.getIn(['login','isLogged']),
        username: state.auth.getIn(['login','username'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(withRouter(LoginFormContainer));