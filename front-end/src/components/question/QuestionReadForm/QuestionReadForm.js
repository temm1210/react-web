import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CKEditor from 'components/common/Editor';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const styles = theme => ({
    wrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    root: {
        margin:30,
        border: '1px solid rgba(0,0,0,.2)',
        boxShadow:'0 1px 1px rgba(199,218,202,0.8)',
        padding:0,
        backgroundColor: theme.palette.background.paper,
        maxWidth: 800,
        width: '100%'
    },
    title: {
        fontWeight:'bold',
        margin:'13',
        fontSize:43
    },
    content: {
        minHeight:200
    },
    button:{
        height: 45,
        width: 95,
        marginRight: 50
    },
    buttonWrap:{
        textAlign:'center'
    }
});

  
function QuestionWriteForm(props) {
    const { classes, question,username,questionDelete } = props;
    return (
        <div className={classes.wrap}>
            <Typography style={{marginTop:50}} variant="h4" id="tableTitle">
                Q&A
            </Typography>
            <div className={classes.root}>
                <List disablePadding={true}>
                    <ListItem>
                        <ListItemText 
                            primary={<Typography style={{ fontSize:18 , color:'#2a6496'}}>{question.username} </Typography>}
                            secondary={<Typography style={{ color: 'rgba(0,0,0,.3)', fontSize:12 }}>{moment(question.writeDate).format("YYYY-MM-DD HH:mm")}</Typography>} />
                        <ListItemIcon>
                                <VisibilityIcon />
                        </ListItemIcon>
                        
                        <Typography color="textSecondary" variant="subtitle1">
                            {question.views}
                        </Typography>
                    </ListItem>
                    <div style={{borderBottom:"1px solid rgba(0,0,0,.2)"}}></div>
                
                    <ListItem>
                        <div style={{padding:15}}>
                            <Typography className={classes.title} align="right" color="default" style={{fontSize:23}}>
                                {question.title}
                            </Typography> 
                        </div>
                    </ListItem>
                
                    <CKEditor
                        data={question.content}
                        config={{
                            isReadOnly:true
                        }}
                        init={{
                            toolbar:[]
                        }}
                    />
                </List>
            </div>
            {
                (username && username === question.username ) ? 
                (
                    <div className={classes.buttonWrap}>
                        <Button variant="contained" color="primary" className={classes.button}>
                            수정
                        </Button>

                        <Button onClick={questionDelete} variant="contained" color="secondary" className={classes.button}>
                            삭제
                        </Button>
                    </div>
                ) :
                (
                    null
                )
            }
        </div>
    )
}

QuestionWriteForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionWriteForm)
