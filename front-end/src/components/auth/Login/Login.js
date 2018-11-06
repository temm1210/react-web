import React from 'react';
import * as LoginFormElement from './LoginFormElement';
import ReduxForm from 'components/common/ReduxForm';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import './Login.scss';


export default ({ onSubmit,errorMsg }) => {

    const formFields = [
        {
            name        : "username",
            label       : "아이디",
            component   : LoginFormElement.renderTextField
        },
        {
            name        : "password",
            label       : "패스워드",
            type        : "password",
            component   : LoginFormElement.renderTextField
        }
    ];

    const buttonFields = [
        {
            type    : "submit",
            text    : "로그인",
            color   : "primary",
            variant : "contained"
        },
        {
            text        : "회원가입",
            color       : "secondary",
            variant     : "contained",
            component   : Link,
            to          : "/join"
        }
    ]

    const formStyle = {
        margin:20,
        background:'white',
        padding:50,
        boxShadow: 'rgba(140, 140, 140, 0.4) 0.8px 0.5px 0.6px',
        border:'1px solid rgba(140,140,140, .4)',
        minWidth: 600
    }

    const buttonWrapStyle = {
        textAlign:'center',
        marginTop:'20px'
    }

    const validate = values => {
        const errors = {};
        const requiredFields = formFields.map(formInfo => formInfo.name);

        requiredFields.forEach(field => {
            if (!values[ field ]) {
                errors[ field ] = 'Required'
            }
        })
        return errors;
    }

    return (
        <div className="loginWrap">
            <ReduxForm 
                onSubmit={onSubmit}
                formStyle={formStyle}
                buttonWrapStyle={buttonWrapStyle}
                formFields={formFields}
                buttonFields={buttonFields}
                validate={validate}
                errorMsg={errorMsg}
            >
                <Typography style={{textAlign:'center'}} variant="h5" id="tableTitle">
                    로그인
                </Typography>
            </ReduxForm>
        </div>
    )
}
