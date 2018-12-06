import React from 'react'
import BaseContainer from 'containers/base/BaseContainer';
import QuestionReadContainer from 'containers/question/QuestionReadContainer';


export default ({match}) => {
    
    const { id } = match.params;
    return (
        <BaseContainer>
           <QuestionReadContainer questionId={id} />
        </BaseContainer>
    )
}
