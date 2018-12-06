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
import CommentWrite from 'components/comment/CommentWrite';
import CommentList from 'components/comment/CommentList';
import { Field, reduxForm } from 'redux-form';
import * as baseFields from 'components/question/QuestionWriteForm/questionWriteFields';
import Divider from '@material-ui/core/Divider';

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

const QuestionWriteForm = (props) => {
   
    const { classes, question,username,questionDelete,setModifyMode } = props;

    console.log('initValues:',question)
    
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
                
                    <Divider variant="middle" />

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
                        <Button
                            // onClick={() => questionModify(question._id)}
                            onClick={setModifyMode}
                            variant="contained" 
                            color="primary" 
                            className={classes.button}>
                            수정
                        </Button>

                        <Button 
                            onClick={() =>questionDelete(question._id)} 
                            variant="contained" color="secondary" className={classes.button}>
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

const ReadForm = withStyles(styles)(QuestionWriteForm);

const style = {
    formStyle:{
        marginLeft:20,
        marginRight:20,
        marginTop:70,
        marginBottom:70,
        background:'white',
        padding:20,
        boxShadow: 'rgba(140, 140, 140, 0.4) 0.8px 0.5px 0.6px',
        border:'1px solid rgba(140,140,140, .4)',
        maxWidth: 800,
        width: '100%'
    },
    buttonWrapStyle: {
        textAlign:'center',
        marginTop:30,
        marginBottom:30
    },
    button:{
        height: 45,
        width: 95,
        marginRight: 50
    },
    questionWriteWrap:{
        display: 'flex',
        margin: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}
class InitializeFromStateForm extends React.Component {

    state = {
        isModifyMode:false
    }

    setModifyMode = () => {
        this.setState({
            isModifyMode: !this.state.isModifyMode
        })
    }

    // componentDidMount = () => {
    //     const { onLoad } = this.props;
    // }

    submit = (values) => {
        const {onSubmit} = this.props;
        this.setModifyMode();
        onSubmit(values);
    }
    render() {
        const { handleSubmit, pristine, username, submitting,initialValues,questionDelete,handleCommentSubmit} = this.props
        return (
            this.state.isModifyMode ? (
                <div style={style.questionWriteWrap}>
                    <Typography style={{marginTop:50}} variant="h4" id="tableTitle">
                        게시글수정
                    </Typography>
                    <div style={style.formStyle}>
                        <form onSubmit={handleSubmit(this.submit)}>
                            <div>
                                <Field
                                    name="username"
                                    label={username}
                                    component={baseFields.renderListItem}
                                />
                            </div>
                            <div>
                                <Field
                                    name="title"
                                    label="제목"
                                    component={baseFields.renderTextField}
                                />
                            </div>
                            <div>
                                <Field 
                                    name="content" 
                                    component={baseFields.renderEditor}
                                    label="Content"
                                />
                            </div>
            
                            <div style={style.buttonWrapStyle}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    style={style.button}
                                    type="submit" 
                                    disabled={pristine || submitting}>
                                    등록
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={this.setModifyMode}
                                    style={style.button}
                                    >
                                    취소
                                </Button>
                            </div>
                        </form>  
                    </div> 
                </div>
            ):
            (
                <div>
                    <ReadForm
                        setModifyMode={this.setModifyMode}
                        question={initialValues} 
                        username={username} 
                        questionDelete={questionDelete}/>

                    <CommentList
                        comments={initialValues.comments}
                        username={username}
                    />
                    { username ?
                        <CommentWrite 
                            onSubmit={handleCommentSubmit}
                            username={username}
                        /> :
                        <div style={{textAlign:'center', margin:'40px'}}>댓글은 로그인을 하셔야 합니다.</div>       
                    }

                </div>
            )
        )   
    }
}

InitializeFromStateForm = reduxForm({
    form: 'QuestionReadForm',
    enableReinitialize : true
})(InitializeFromStateForm)


// InitializeFromStateForm = connect(
//     state => ({
//         initialValues: state.question.get('currentQuestionData')
//     }),
//     { load: getEndQuestion } 
// )(InitializeFromStateForm)

export default InitializeFromStateForm

