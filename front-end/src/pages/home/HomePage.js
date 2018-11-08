import React from 'react';
import BaseContainer from 'containers/base/BaseContainer';
import Home from 'components/Home';
// import TestHome from 'components/Home/testform';
import QuestionListContainer from 'containers/question/QuestionListContainer';

function HomePage() {
  return (
    <BaseContainer>
      <Home/>
      {/* <QuestionListContainer limit={5}/> */}
    </BaseContainer>
  );
}

export default HomePage;