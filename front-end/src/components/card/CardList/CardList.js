import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline"
import Pagination from "material-ui-flat-pagination";
import { withRouter } from 'react-router-dom';

const theme = createMuiTheme();

const styles = {
    cardContainer:{ 
        display: 'flex',
        flexDirection: 'row',
    },
    cardWrap: {
        // maxWidth: 300,
        display: 'flex',
        flexFlow:'column wrap',
        marginTop:110,
        marginBottom:60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        flexGrow:1,
        flexShrink:1,
        margin:10,
        width: '100%',
        marginBottom: 25,
        maxWidth: '1100px',
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    title: {
        fontSize: '20px',
        color:'#2a6496',
        wordBreak: 'break-all'
    },
    username: {
        opacity: .6,
        fontSize: 12,
        paddingTop:6,
        paddingLeft:10,
        color:'#337ab7'
    },
    date: {
        marginLeft: 'auto',
        width: '150px',
        textAlign: 'right',
        opacity: '.5'
    },
    iconSize: {
        fontSize:20
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
};

class CardList extends React.Component {
    state = {
        offset:0
    }

    handlePage = (offset) => {
        const { limit,history } = this.props;
        const page = parseInt(offset/limit, 10) + 1;
        this.setState({
            offset
        })
        history.push(`/postlist/${page}`)
    }    

    render() {
        const { classes,questions,totalCount,page,limit } = this.props;
        return (
            <div className={classes.cardContainer}>
                <div className={classes.cardWrap}> 
                    <Typography style={{textAlign:'center',marginBottom:40}} variant="h5" id="tableTitle">
                        Q&A 
                    </Typography>
                    {
                        questions.map((question, index) => (
                            // <Link >
                            <Card className={classes.card} key={index}>
                                <CardActionArea>
                                    {/* <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        className={classes.media}
                                        height="140"
                                        image={question.img}
                                        title="Contemplative Reptile"
                                    /> */}
                                    <CardContent>
                                        <div className={classes.titleWrap}>
                                            <Typography component={Link} to={`/questionget/${question._id}`} className={classes.title} gutterBottom variant="h5" component="h2">
                                                {question.title}
                                            </Typography>
            
                                            <Typography className={classes.username} component="span">
                                                {question.username}
                                            </Typography>
            
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
        );
    }
}

// function Card(props) {

//     const { classes,questions,totalCount,page,limit } = this.props;
//     return (
//         <div className={classes.cardWrap}>
//         <Typography style={{textAlign:'center'}} variant="h5" id="tableTitle">
//             Q&A 
//         </Typography>
//         {
//             questions.map((question, index) => (
//                 <Card className={classes.card} key={index}>
//                     <CardActionArea>
//                         {/* <CardMedia
//                             component="img"
//                             alt="Contemplative Reptile"
//                             className={classes.media}
//                             height="140"
//                             image={question.img}
//                             title="Contemplative Reptile"
//                         /> */}
//                         <CardContent>
//                             <div className={classes.titleWrap}>
//                                 <Typography className={classes.title} gutterBottom variant="h5" component="h2">
//                                     {question.title}
//                                 </Typography>

//                                 <Typography className={classes.username} component="span">
//                                     {question.username}
//                                 </Typography>

//                                 <Typography component="span" className={classes.date}>
//                                 {
//                                     (function(){
//                                         let now = moment();
//                                         let dataDate = moment(question.writeDate);
//                                         let diff = now.diff(dataDate)
//                                         return diff > 80000000 ? moment(dataDate).format("YYYY-DD-MM HH:mm") : 
//                                                         moment(question.writeDate).fromNow()
//                                     })()
//                                 }
//                                 </Typography>
//                             </div>
//                             <Typography component="p" className={classes.textElipse}>
//                                 {question.content}
//                             </Typography>
//                         </CardContent>

//                         <CardActions className={classes.cardActions}>

//                             <Button size="small" color="primary" disabled>
//                                 <VisibilityIcon className={classes.iconSize}/>
//                                 {question.views}
//                             </Button>
//                             <Button size="small" color="primary" disabled>
//                                 <CommentIcon className={classes.iconSize}/>
//                             </Button>
//                         </CardActions>
//                     </CardActionArea>
//                 </Card>
//             ))
//         }
//         </div>
//     );
// }

CardList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(CardList));