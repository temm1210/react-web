import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from 'store/reducers/auth';
import { bindActionCreators } from 'redux';

import Base from 'components/common/Base';

class BaseContainer extends Component {
    handleLogout = () => {
        const { AuthActions } = this.props;
        if(window.confirm('로그아웃 하시겠습니까?')){
            AuthActions.logout();
            localStorage.removeItem('username')
        }
    }

    render() {
        const {children,isLogged} = this.props;
        const { handleLogout } = this;

        return (
            <div>
                <Base isLogged={isLogged} onLogout={handleLogout}>
                    {children}
                </Base>
            </div>

        );
    }
}

export default connect(
    (state) => ({
        isLogged: state.auth.getIn(['login','isLogged'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(BaseContainer)