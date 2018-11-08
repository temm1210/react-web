import React from 'react';
import QuestionListContainer from 'containers/question/QuestionListContainer';
import BaseContainer from 'containers/base/BaseContainer';

export default ({match}) => {
    return (      
        <BaseContainer>            
            <QuestionListContainer page={match.params.page} limit={10}/>
        </BaseContainer>        
    )
}