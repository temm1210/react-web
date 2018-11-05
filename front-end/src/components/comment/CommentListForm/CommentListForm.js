import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        margin:30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    typographyBackground:{
        background:'#eee',
        padding:'10px',
        fontSize:'15px',
        borderBottom: '1px solid rgba(0,0,0,.2)',
    },
    zeroPadding: {
        width: '100%',
        maxWidth: '800px',
        background: 'white',
        border: '1px solid rgba(0,0,0,.2)',
        boxShadow: '1px 1px 1px rgba(0,0,0, .1)',
        padding:0
    }

});

function CommentForm(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <List className={classes.zeroPadding}>
                <Typography className={classes.typographyBackground} variant="h6" id="tableTitle">
                    댓글
                </Typography>      
                <ListItem>
                    <ListItemText 
                        primary={<Typography type="body2" style={{ fontSize: '13px' }}>작성자</Typography>}
                        secondary={<Typography type="body2" style={{ color: 'rgba(0,0,0,.3)', fontSize:'11px' }}>날짜</Typography>} />
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