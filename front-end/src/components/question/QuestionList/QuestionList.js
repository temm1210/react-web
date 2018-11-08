
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { withRouter } from 'react-router-dom';
import './QuestionList.scss';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    minWidth: '950px',
    flex: 1,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  tdStyle: {
    textAlign:'center',
    textDecoration:'none',
    padding: 25
  }
});
const theme = createMuiTheme();

class QuestionList extends React.Component {

  state = {
    offset:0
  }

  handlePage = (offset) => {
    const { limit,history } = this.props;
    const page = parseInt(offset/limit, 10) + 1;
    this.setState({
      offset
    })
    console.log('offset:',offset);
    history.push(`/questionlist/${page}`)
  }

  render() {
    const { classes,questions,totalCount,page,limit } = this.props;

    console.log('page:',page)
    return (
      <div className="questionList">
        <CssBaseline/>
        <div className="imageContainer">
          <div className="imageWrap">
            {/* <img className="imageWidth" alt="question1" src={require('../../../assets/images/question2.png')}/>
            <img className="imageWidth" alt="question2" src={require('../../../assets/images/question.png')}/> */}
          </div>
          <div className="imageCaption">
            <Typography style={{textAlign:'center'}} variant="h5" id="tableTitle">
              Q&A 
            </Typography>
          </div>
        </div>
        <div className="tableWrap">
          <div className="listWrap">
            <Button component={Link} to={'/questionwrite'} variant="contained" color="primary">새글쓰기</Button>
          </div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell numeric className={classes.tdStyle}>번호</CustomTableCell>
                  <CustomTableCell className={classes.tdStyle}>제목</CustomTableCell>
                  <CustomTableCell className={classes.tdStyle}>아이디</CustomTableCell>
                  <CustomTableCell className={classes.tdStyle}>등록날짜</CustomTableCell>
                  <CustomTableCell numeric className={classes.tdStyle}>조회수</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  questions.map(question => {
                    return (
                      
                      <TableRow key={question.id}>
                        <CustomTableCell numeric className={classes.tdStyle} component="th" scope="row">
                          {question._id}
                        </CustomTableCell>
                        <CustomTableCell component={Link} to={`/questionget/${question._id}`} className={classes.tdStyle}>{question.title}</CustomTableCell>
                        <CustomTableCell className={classes.tdStyle}>{question.username}</CustomTableCell>
                        <CustomTableCell numeric className={classes.tdStyle}>
                        {
                          (function(){
                            let now = moment();
                            let dataDate = moment(question.writeDate);
                            let diff = now.diff(dataDate)
                            return diff > 80000000 ? moment(dataDate).format("YYYY-DD-MM HH:mm") : 
                                              moment(question.writeDate).fromNow()
                          })()
                        }
                        </CustomTableCell>
                        <CustomTableCell numeric className={classes.tdStyle}>{question.views}</CustomTableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
        <div className="paginationWrap">
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
                size="large"
                limit={limit}
                offset={this.state.offset}
                total={totalCount}
                onClick={(e, offset) => this.handlePage(offset)}
            />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function removeHtml(text) {
  text = text.replace(/<br\/>/ig, "\n"); 
  text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
  return text
}




export default withRouter(withStyles(styles)(QuestionList));