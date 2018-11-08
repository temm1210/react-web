
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
import CardMedia from '@material-ui/core/CardMedia';
// import testImage from 'assets/images/question_top.jpg';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import './QuestionList.scss';


const theme = createMuiTheme();

const styles = theme => ({
  cardContainer:{ 
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  cardWrap: {
    // maxWidth: 300,
    display: 'flex',
    flexFlow:'column wrap',
    width: '100%',
    marginBottom:60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    flexGrow:1,
    flexShrink:1,
    margin:10,
    width: '100%',
    marginBottom: 5,
    maxWidth: '700px',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  textElipse: {
    flex:1,
    overflow: 'hidden',
    fontSize:13,
    textOverflow: 'ellipsis',
    width: '600px',
    whiteSpace: 'nowrap'
  },
  titleWrap: {
    display: 'flex',
    borderBottom: '1px solid rgba(0,0,0,.2)',
    marginBottom: '20px',
    paddingBottom: '20px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },

  username: {
    fontSize: 14,
    paddingLeft: 10
  },
  date: {
    marginLeft: 'auto',
    width: '150px',
    textAlign: 'right',
    paddingRight: 15,
    paddingTop: 22,
    minWidth: 150,
    opacity: '.5'
  },
  iconSize: {
    fontSize:20
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  infoWrap:{
    marginTop: 20,
    marginLeft: 12,
    wordBreak: 'break-all'
  }
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
            <Typography style={{textAlign:'center'}} variant="h5" id="tableTitle">
              Q&A 
            </Typography>
          </div>
        </div>

        <div className={classes.cardContainer}>
          <div className={classes.cardWrap}>
            {
              questions.map((question, index) => (        
                <Card className={classes.card} key={index}>
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
                          <div className={classes.titleWrap}>
                              <Avatar
                                  alt="Adelle Charles"
                                  src="/images/24.png"
                                  style={{width:70, height:70, marginTop:10}}
                              />
                              <div className={classes.infoWrap}>
                                  <strong style={{fontWeight: 700, fontSize:27}}>{question.title}</strong>                                 
                                  <small className={classes.username}>({question.username})</small>
                              </div>

                              <Typography component="span" className={classes.date}>
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
                          <Typography component="p" className={classes.textElipse}>
                              {question.content}
                          </Typography>
                      </CardContent>

                      <CardActions className={classes.cardActions}>
                        <Button size="small" color="primary" disabled>
                            <VisibilityIcon className={classes.iconSize}/>
                            {question.views}
                        </Button>
                        <Button size="small" color="primary" disabled>
                            <CommentIcon className={classes.iconSize}/>
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