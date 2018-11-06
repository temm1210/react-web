import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = theme => ({
    root: {
        margin:30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    typographyBackground:{
        padding: 10,
        fontSize: 15,
        fontWeight: 900,
        maxWidth: 800,
        /* min-width: 800px; */
        width: '100%',
        background: '#eee'
    },
    zeroPadding: {
        width: '100%',
        maxWidth: '800px',
        background: 'white',
        border: '1px solid rgba(0,0,0,.2)',
        borderBottom:0,
        boxShadow: '1px 1px 1px rgba(0,0,0, .1)',
        padding:0
    }

});

function CommentForm(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Typography className={classes.typographyBackground} variant="h6" id="tableTitle">
                댓글
            </Typography> 
            <List className={classes.zeroPadding}>
                <ListItem>
                    <ListItemText 
                        primary={<Typography type="body2" style={{ fontSize: 13,color:'#2a6496' }}>작성자</Typography>}
                        secondary={<Typography type="body2" style={{ color: 'rgba(0,0,0,.3)', fontSize:12 }}>{moment(Date.now()).format("YYYY-MM-DD HH:mm")}</Typography>} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="댓글 내용"/> 
                </ListItem>
            </List>
            <List className={classes.zeroPadding}>     
                <ListItem>
                    <ListItemText 
                        primary={<Typography type="body2" style={{ fontSize: 13 }}>작성자</Typography>}
                        secondary={<Typography type="body2" style={{ color: 'rgba(0,0,0,.3)', fontSize:11 }}>날짜</Typography>} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="댓글 내용"/> 
                </ListItem>
            </List>
        </div>
    );
}


CommentForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentForm)