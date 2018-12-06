import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import CKEditor from 'components/common/Editor';
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
        background: '#eee',
        /* min-width: 800px; */
        width: '100%',
        background: '#eee'
    },
    zeroPadding: {
        width: '100%',
        maxWidth: '800px',
        marginBottom: '20px',
        background: 'white',
        border: '1px solid rgba(0,0,0,.2)',
        borderBottom:0,
        boxShadow: '1px 1px 1px rgba(0,0,0, .1)',
        padding:0
    }

});

function CommentForm(props) {
    const { classes, comments,username } = props;

    return (
        comments ? (
            <div className={classes.root}>
                <Typography className={classes.typographyBackground} variant="h6" id="tableTitle">
                    댓글
                </Typography>
                {
                    comments.map((comment,index) => (
                        <List key={index} className={classes.zeroPadding}>
                            <ListItem>
                                <ListItemText 
                                    primary={<Typography type="body2" style={{ fontSize: 13,color:'#2a6496' }}>{comment.username}</Typography>}
                                    secondary={<Typography type="body2" style={{ color: 'rgba(0,0,0,.3)', fontSize:12 }}>{moment(comment.date).format("YYYY-MM-DD HH:mm")}</Typography>} />
                                {
                                    username === comment.username ? (
                                        <div style={{}}>
                                            <Tooltip title="삭제하기">
                                                <IconButton style={{color:'#f50057', opacity:'.6'}} aria-label="Delete" className={classes.margin} color="primary">
                                                    <DeleteForever fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    ) :
                                    null
                                }
                            </ListItem>

                            <CKEditor
                                idNumber={index+3}
                                data={comment.text}
                                config={{
                                    isReadOnly:true
                                }}
                                init={{
                                    toolbar:[]
                                }}
                            />
                        </List>
                    ))
                }
            </div>
        ) :
        null
    );
}


CommentForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentForm)