
import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import QuestionListHeader from './QuestionListHeader';
import QuestionListBody from './QuestionListBody';
import withPagination from 'components/common/Pagination';
import withScrollTop from 'components/common/ScrollTop';
import Pagination from "material-ui-flat-pagination";
import './QuestionList.scss';

const QuestionList = ({questions,totalCount,limit,onSubmit, offset,handleScrollTop}) =>{
  return (
    <div className="questionList">
      <CssBaseline/>
      <QuestionListHeader/>
 
      <div className="cardContainer">
        <QuestionListBody questions={questions}/>
      </div>
      <div className="paginationWrap">
        <Pagination
            size="large"
            limit={limit}
            offset={offset}
            total={totalCount}
            onClick={(e, offset) => {
              handleScrollTop && handleScrollTop(400);
              onSubmit({offset,path:"questionlist",limit})}
            }
        />
      </div>
    </div>
  );
}

// export default withScrollTop(withPagination(withRouter(QuestionList)));
export default compose(
  withRouter,
  withPagination,
  withScrollTop,
)(QuestionList)