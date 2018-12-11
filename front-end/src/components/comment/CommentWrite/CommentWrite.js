import React, {Component} from 'react'
import * as baseFields from './CommentWriteField';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import './CommentWrite.scss';

class CommentWrite extends Component {
    state = {
        isFocus: false
    }

    handleFocus = () => {
        this.setState({
            isFocus: true
        })
    }

    render() {
        const { handleSubmit, onSubmit,username} = this.props
        const { isFocus } = this.state;

        return (
            <div className="formWrap">
                <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Field
                            name="username"
                            component={baseFields.renderListItem}
                            label={username}
                        />
                    </div>
                    <div>
                        {
                            isFocus ?
                                <Field
                                    name="content"
                                    component={baseFields.renderEditor}
                                />
                            :
                                <Field
                                    component={baseFields.renderTextField}
                                    onFocus={this.handleFocus}
                                />   
                        }
                    </div>
                    <div className="buttonWrapStyle">
                        <Button
                            id="comment-submit-btn"
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            style={{marginRight:60}}
                        >
                            등록
                        </Button>
                        <Button
                            id="comment-cancel-btn"
                            variant="contained"
                            onClick={this.handleFocus} 
                            color="secondary">
                            취소
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'CommentWrite'  // a unique identifier for this form
})(CommentWrite)
