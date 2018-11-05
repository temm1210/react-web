import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Join from 'components/auth/Join';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/reducers/auth';

class JoinContainer extends Component {
    
    handleSubmit = async (values) => {
        const {history,AuthActions } = this.props;
        try{
            const result = await AuthActions.join(values);

            if(result.status === 200){
                window.alert("회원가입에 성공하셨습니다")
                history.push('/');
            } else {
                window.alert("회원가입에 실패하였습니다. 다시시도해주세요.")
            }
        } catch(e){
            console.error(e);
            window.alert("회원가입에 실패하였습니다. 다시시도해주세요.")
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        if(window.confirm("정말 취소를 하시겠습니까?"))
            history.goBack();
    }
    render() {
        return (
            <div>
                <Join
                    onSubmit={this.handleSubmit}
                    onGoBack={this.handleGoBack}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        status: state.auth.getIn(['join','status']),
        error: state.auth.getIn(['join','error'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(withRouter(JoinContainer));