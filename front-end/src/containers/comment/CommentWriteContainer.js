import React, {Component} from 'react';
import CommentWrite from 'components/comment/CommentWrite';
import { connect } from 'react-redux';

class CommentWriteContainer extends Component {
    state = {
        isFocus:false
    }

    handleSubmit = values => {
        const { username } = this.props;
        const { content } = values;

        if( content ){
            values.username = username;
            console.log('values:',values);
        } else {
            window.alert("댓글을 입력하세요")
        }
    }

    render() {
        const { username } = this.props;

        return (
            <CommentWrite 
                onSubmit={this.handleSubmit}
                username={username}
            />
        )
    }
}

export default connect(
    (state) => ({
        username: state.auth.getIn(['login','username'])
    }),
    (dispatch) => ({

    })
)(CommentWriteContainer);
