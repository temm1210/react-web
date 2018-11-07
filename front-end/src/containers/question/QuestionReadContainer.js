import React, { Component } from 'react';
import QuestionReadForm from 'components/question/QuestionReadForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as questionActions from 'store/reducers/question';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as api from 'services/api';

const styles={
    progress: {
        position: 'absolute',
        top: '40%',
        left: '60%',
        textAlign: 'center'
    }
}

class QuestionRead extends Component {
    componentDidMount = () => {
        const { questionId,QuestionActions } = this.props;
        QuestionActions.getStartQuestion(questionId);
    }
    
    handleQuestionDelete = (id) => {
        if(window.confirm("삭제하시겠습니까?")){
            const { QuestionActions }= this.props;
            QuestionActions.deleteQuestion(id);
        }
    }

    handleQuestionModify = async (question) => {
        console.log('question:',question);
        const { QuestionActions} = this.props;
        try {
            if(window.confirm("수정하시겠습니까?")){
                const { data: {status} } = await api.modifyQuestion(question._id, question);
                console.log('status:',status);

                if(status === 200){
                    QuestionActions.getEndQuestion(question)
                    
                }
            }          
        } catch (error) {
            throw Error("게시글 수정 에러발생")
        }

    }

    componentDidUpdate = (prevProps, prevState) => {
        const { deletedData, history,currentData } = this.props;
        if(prevProps.deletedData !== deletedData)
            history.push('/questionlist')
        
        if(prevProps.currentData !== currentData)
            history.push(`/questionget/${currentData._id}`)
    }
    
    render() {
        const { loading,currentData,username } = this.props;
        
        if(loading) {
            return <CircularProgress style={styles.progress} size={50} />
        }

        return (  
            <QuestionReadForm
                onSubmit={this.handleQuestionModify}
                questionDelete={this.handleQuestionDelete}
                username={username}
                question={currentData}/>
        );
    }
}

export default connect(
    (state) => ({
        deletedData : state.question.getIn(['delete','data']),
        currentData  : state.question.get('currentData'),
        username    : state.auth.getIn(['login','username']),
        loading     : state.loading.get('loading'),
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(withRouter(QuestionRead));