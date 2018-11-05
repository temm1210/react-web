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
        const { QuestionActions, history,currentData } = this.props;

        console.log('currentData:',currentData);
        if(window.confirm("등록 하시겠습니까?")){ 
            QuestionActions.setQuestion(values);
            history.push(`/getquestion/${currentData._id}`)
        }
    }

    handleGoBack = () => {
        const { history } = this.props;
        if(window.confirm("정말 취소를 하시겠습니까?"))
            history.goBack();
    }
    render() {

        const { loading } = this.props;
        if(loading) {
            return <CircularProgress style={styles.progress} size={50} />
        }
        return (
            <QuestionWriteForm 
                onSubmit={this.handleSubmit}
                onGoBack={this.handleGoBack} />
        );
    }
}

export default connect(
    (state) => ({
        loading     : state.loading.get('loading'),
        currentData : state.question.get('currentData')
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(withRouter(QuestionWriteContainer));