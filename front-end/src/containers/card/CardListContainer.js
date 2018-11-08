import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as questionActions from 'store/reducers/question';
import CardList from 'components/card/CardList';
import { withRouter } from 'react-router-dom';

class CardContainer extends Component {

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.location !== this.props.location){
            console.log('this.props.page:',this.props.page)
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

        return (
            <CardList 
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
        data    : state.question.get('data'),
        totalCount: state.question.getIn( ['paging','totalCount'] ),
        loading : state.loading.get('loading')
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(withRouter(CardContainer));