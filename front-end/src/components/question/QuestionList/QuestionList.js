
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { withRouter } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import './QuestionList.scss';


const theme = createMuiTheme();

const styles = theme => ({
 
});

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
    history.push(`/questionlist/${page}`)
  }

  render() {
    const { classes,questions,totalCount,page,limit } = this.props;

    return (
      <div className="questionList">
        <CssBaseline/>
        <div className="imageContainer">
          <div className="imageWrap">
            <div className="headerImage"></div>
          </div>
          <div className="imageCaption">
            <Typography className="imageText" variant="h5" id="tableTitle">
              Q&A 
            </Typography>
          </div>
        </div>

        <div className="createBtn">
          <Tooltip title="질문하기">
              <Button variant="fab" color="primary" aria-label="Add">
              <AddIcon />
              </Button>
          </Tooltip>
        </div>
        <div className="cardContainer">
          <div className="cardWrap">
            {
              questions.map((question, index) => (        
                <Card className="card" key={index}>
                  <Link to={`/questionget/${question._id}`}>  
                    <CardActionArea> 
                    {/* <CardActionArea> */}
                        {/* <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            className={classes.media}
                            height="140"
                            image={testImage}
                            title="Contemplative Reptile"
                        /> */}
                      <CardContent>
                          <div className="titleWrap">
                              <Avatar
                                  alt="Adelle Charles"
                                  src="/images/24.png"
                                  style={{width:70, height:70, marginTop:10}}
                              />
                              <div className="infoWrap">
                                  <strong style={{fontWeight: 700, fontSize:27}}>{question.title}</strong>                                 
                                  <small className="username">({question.username})</small>
                              </div>

                              <Typography component="span" className="date">
                              {
                                  (function(){
                                      let now = moment();
                                      let dataDate = moment(question.writeDate);
                                      let diff = now.diff(dataDate)
                                      return diff > 80000000 ? moment(dataDate).format("YYYY-DD-MM HH:mm") : 
                                                      moment(question.writeDate).fromNow()
                                  })()
                              }
                              </Typography>
                          </div>
                          <Typography component="p" className="textElipse">
                              {question.content}
                          </Typography>
                      </CardContent>

                      <CardActions className="cardActions">
                        <Button size="small" color="primary" disabled>
                            <VisibilityIcon className="iconSize"/>
                            {question.views}
                        </Button>
                        <Button size="small" color="primary" disabled>
                            <CommentIcon className="iconSize"/>
                        </Button>
                      </CardActions>
                    </CardActionArea>
                  </Link>
                </Card>
                ))
              }
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
          </div>
        </div>
        );
    }
}


QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(QuestionList));