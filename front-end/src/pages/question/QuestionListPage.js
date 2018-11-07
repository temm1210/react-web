import React from 'react';
import QuestionListContainer from 'containers/question/QuestionListContainer';
import BaseContainer from 'containers/base/BaseContainer';
import QuestionPaginingContainer from 'containers/question/QuestionPaginingContainer';

export default () => {
    return (      
        <BaseContainer>            
            <QuestionListContainer/>
            <QuestionPaginingContainer/>
        </BaseContainer>        
    )
}