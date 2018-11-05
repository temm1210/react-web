import React from 'react'
import QuestionReadContainer from 'containers/question/QuestionReadContainer';
import CommentListContainer from 'containers/comment/CommentListContainer';
import BaseContainer from 'containers/base/BaseContainer';

export default ({match}) => {
    
    const { id } = match.params;
    return (
        <BaseContainer>
            <QuestionReadContainer questionId={id}/>
            <CommentListContainer/>
        </BaseContainer>
    )
}
