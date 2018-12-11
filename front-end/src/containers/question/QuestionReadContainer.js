import React, { Component } from 'react';
import QuestionReadForm from 'components/question/QuestionReadForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as questionActions from 'store/reducers/question';
import * as commentActions from 'store/reducers/comment';
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

    handleCommentSubmit = values => {
        const { username, CommentActions,questionId } = this.props;
        const { content } = values;

        if( content ){
            values.username = username;
            CommentActions.setComment({id:questionId, comment:values})
        } else {
            window.alert("댓글을 입력하세요")
        }
    }
    
    handleQuestionDelete = (id) => {
        if(window.confirm("삭제하시겠습니까?")){
            const { QuestionActions,loading,history,initialValues }= this.props;
            QuestionActions.deleteQuestion(id);
            if( !loading)
                history.push('/questionlist/1')
        }
    }

    handleQuestionModify = async (question) => {
        try {
            if(window.confirm("수정하시겠습니까?")){
                await api.modifyQuestion(question._id, question);
            }          
        } catch (error) {
            throw Error("게시글 수정 에러발생")
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { deletedData, history,initialValues } = this.props;
        if(prevProps.deletedData !== deletedData)
            history.push(`/questionlist/${initialValues._id}`)
        
        if(prevProps.initialValues !== initialValues)
            history.push(`/questionget/${initialValues._id}`)
    }
    
    render() {
        const { loading,initialValues,username } = this.props;
        
        if(loading) {
            return <CircularProgress style={styles.progress} size={50} />
        }

        return (  
            <QuestionReadForm
                handleCommentSubmit={this.handleCommentSubmit}
                onSubmit={this.handleQuestionModify}
                questionDelete={this.handleQuestionDelete}
                username={username}
                initialValues={initialValues}/>
        );
    }
}

export default connect(
    (state) => ({
        deletedData  : state.question.getIn(['delete','data']),
        username     : state.auth.getIn(['login','username']),
        loading      : state.loading.get('loading'),
        initialValues: state.question.get('currentQuestionData') // initialValues를 선언해야 store에 저장됨.
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch),
        CommentActions: bindActionCreators(commentActions, dispatch)
    })
)(withRouter(QuestionRead));