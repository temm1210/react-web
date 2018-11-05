import React, { Component } from 'react';
import QuestionReadForm from 'components/question/QuestionReadForm';
import { connect } from 'react-redux';

import * as questionActions from 'store/reducers/question';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    
    render() {
        const { loading,currentData,isLogged } = this.props;
        
        if(loading) {
            return <CircularProgress style={styles.progress} size={50} />
        }

        return (
            <div>
                <QuestionReadForm 
                    isLogged={isLogged}
                    question={currentData}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isLogged    : state.auth.getIn(['login','isLogged']),
        loading     : state.loading.get('loading'),
        currentData : state.question.get('currentData')
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(QuestionRead)