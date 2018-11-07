import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as questionActions from 'store/reducers/question';
import QuestionList from 'components/question/QuestionList';

const styles={
    progress: {
        position: 'absolute',
        top: '40%',
        left: '60%',
        textAlign: 'center'
    }
}

class QuestionListContainer extends Component {
    componentDidMount = async () => {
        // const { QuestionActions } = this.props;
        // QuestionActions.getQuestionList();
    }

    render() {
        const {data , loading } = this.props;
        // if(loading) {
        //     return <CircularProgress style={styles.progress} size={50} />
        // }
        
        return (
            <QuestionList
                questions={data}
            />
        );
    }
}

export default connect(
    (state) => ({
        data        : state.question.get('data'),
        loading     : state.loading.get('loading')
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(QuestionListContainer);

