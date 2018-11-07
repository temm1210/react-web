import React from 'react'
import BaseContainer from 'containers/base/BaseContainer';
import QuestionReadContainer from 'containers/question/QuestionReadContainer';
import CommentListContainer from 'containers/comment/CommentListContainer';
import CommentWriteContainer from 'containers/comment/CommentWriteContainer';

export default ({match}) => {
    
    const { id } = match.params;
    return (
        <BaseContainer>
           <QuestionReadContainer questionId={id} />
           <CommentListContainer/>
           <CommentWriteContainer/>
        </BaseContainer>
    )
}
