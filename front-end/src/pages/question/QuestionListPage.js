import React from 'react'
import BaseContainer from 'containers/base/BaseContainer';
import QuestionListContainer from 'containers/question/QuestionListContainer';


export default ({match}) => {
    return (
        <BaseContainer>
            <QuestionListContainer page={match.params.page} limit={10}/>
        </BaseContainer>
    )
}
