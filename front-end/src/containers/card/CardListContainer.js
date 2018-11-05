import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as questionActions from 'store/reducers/question';
import CardList from 'components/card/CardList';

class CardContainer extends Component {
    render() {
        // const {data} = this.props;

        return (
            <CardList />
        );
    }
}

export default connect(
    (state) => ({
        // data    : state.question.get('data'),
        loading : state.loading.get('loading')
    }),
    (dispatch) => ({
        QuestionActions: bindActionCreators(questionActions, dispatch)
    })
)(CardContainer);