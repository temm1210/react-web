import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as questionActions from 'store/reducers/question';
import QuestionList from 'components/question/QuestionList';
import { withRouter } from 'react-router-dom';

const styles={
    progress: {
        position: 'absolute',
        top: '40%',
        left: '60%',
        textAlign: 'center'
    }
}

class QuestionListContainer extends Component {

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.location !== this.props.location){
            this.dipatchActionToGetList(this.props.page)
        }
    }
    
    componentDidMount = async () => {
        this.dipatchActionToGetList(this.props.page)
    }

    dipatchActionToGetList = (page) => {
        const { QuestionActions, limit } = this.props;
        QuestionActions.getQuestionList({page,limit})        
    }
    

    render() {
        const {data,loading,totalCount,page,limit } = this.props;
        // if(loading) {
        //     return <CircularProgress style={styles.progress} size={50} />
        // }
        
        return (
            <QuestionList
                limit={limit}
                page={page}
                questions={data}
                totalCount={totalCount}
            />
        );
    }
}

export default connect(
    (state) => ({
        data        : state.question.get('data'),
        totalCount: state.question.getIn( ['paging','totalCount'] ),
        loading     : state.loading.get('loading'),
        // page        : state.question.get(['paging','page'])
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(withRouter(QuestionListContainer));

