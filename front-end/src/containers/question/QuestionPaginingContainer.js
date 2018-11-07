import React, { Component } from 'react';
import Pagination from 'components/common/Pagination';
import { connect } from 'react-redux';
import * as questionActions from 'store/reducers/question';
import {bindActionCreators} from 'redux';

class QuestionPaginingContainer extends Component {

    handleGetQuestionList = (page) => {
        const { QuestionActions } = this.props;
        QuestionActions.getQuestionList(page);
    }
    
    render() {
        const { totalCount } = this.props;

        return (
            <Pagination
                getQuestionList={this.handleGetQuestionList}
                totalCount={totalCount}
                limit={10}/>
        );
    }
}

export default connect(
    (state) => ({
         totalCount: state.question.get('totalCount')
         
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(QuestionPaginingContainer);