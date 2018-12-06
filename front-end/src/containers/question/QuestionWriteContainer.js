import React, { Component } from 'react';
import QuestionWriteForm from 'components/question/QuestionWriteForm';
import * as questionActions from 'store/reducers/question';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles={
    progress: {
        position: 'absolute',
        top: '40%',
        left: '60%',
        textAlign: 'center'
    }
}

class QuestionWriteContainer extends Component {
    handleSubmit = (values) => {
        const { QuestionActions,username } = this.props;

        values.username = username;
        console.log('values:',values);
        
        if(window.confirm("등록 하시겠습니까?")){ 
            console.log('what is it??:',QuestionActions.setQuestion(values));
            
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { history,currentQuestionData } = this.props;

        if(prevProps.currentQuestionData !== currentQuestionData)
            history.push(`/questionget/${currentQuestionData._id}`)
    }
    
    handleGoBack = () => {
        const { history } = this.props;
        if(window.confirm("정말 취소를 하시겠습니까?"))
            history.goBack();
    }
    render() {

        const { loading,username } = this.props;
        // if(loading) {
        //     return <CircularProgress style={styles.progress} size={50} />
        // }

        return (
            <QuestionWriteForm
                username={username}
                onSubmit={this.handleSubmit}
                onGoBack={this.handleGoBack} />
        );
    }
}

export default connect(
    (state) => ({
        username    : state.auth.getIn(['login','username']),
        loading     : state.loading.get('loading'),
        currentQuestionData : state.question.get('currentQuestionData')
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(withRouter(QuestionWriteContainer));