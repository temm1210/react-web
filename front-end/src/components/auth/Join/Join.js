import React from 'react';
import * as JoinFormElement from './JoinFormElement';
import ReduxForm from 'components/common/ReduxForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import './Join.scss';

export default ({onSubmit, onGoBack}) => {

    const formFields = [
        {
            name        : "username",
            label       : "아이디",
            component   : JoinFormElement.renderTextField
        },
        {
            name        : "password",
            label       : "패스워드",
            type        : "password",
            component   : JoinFormElement.renderTextField
        },
        {
            name        : "passwordCheck",
            label       : "패스워드 확인",
            type        : "password",
            component   : JoinFormElement.renderTextField
        },
        {
            name        : "email",
            label       : "이메일",
            type        : "email",
            component   : JoinFormElement.renderTextField
        },
        {
            name        : "gender",
            label       : "성별",
            component   : JoinFormElement.renderRadioGroup,
            childrens    : [
                {
                    component   : FormControlLabel,
                    value       : "male",
                    control     : <Radio />,
                    label       : "남성"
                },
                {
                    component   : FormControlLabel,
                    value       : "female",
                    control     : <Radio />,
                    label       : "여성"
                }
            ]
        }

    ];

    const buttonFields = [
        {
            type    : "submit",
            text    : "가입",
            color   : "primary",
            variant : "contained"
        },
        {
            text    : "취소",
            color   : "secondary",
            variant : "contained",
            onClick : onGoBack
        }
    ]

    const validate =  values => {
        const errors = {}
        const requiredFields = formFields.map(formInfo => formInfo.name);

        requiredFields.forEach(field => {
          if (!values[field]) {
            errors[field] = '필수요소입니다'
          }
        })

        if( values['password'] !== values['passwordCheck']){
            errors.passwordCheck = "비밀번호가 다릅니다"
        }

        if (
          values.email &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = '유효하지 않은 이메일입니다'
        }
        return errors
    }

    const asyncValidate =(values) => {
        return (async function(){
            const isExist = await axios.get(`/auth/checkuser/${values.username}`)
            if(isExist.data){
                throw { username: '이미 존재하는 아이디 입니다.' }
            }
        })();
        // return axios.get(`/auth/checkUser/${values.username}`)
        //             .then(response => {
        //                 if(response.data){
        //                     throw { username: '이미 존재하는 아이디 입니다.' }
        //                 }
        //             })
    }

    const formStyle = {
        margin:20,
        background:'white',
        padding:20,
        boxShadow: 'rgba(140, 140, 140, 0.4) 0.8px 0.5px 0.6px',
        border:'1px solid rgba(140,140,140, .4)',
        minWidth: 600
    }

    const buttonWrapStyle = {
        textAlign:'center',
        marginTop:'20px'
    }

    return (
        <div className="joinWrap">
            <div className="imageContainer">
                <div className="imageWrap">
                    <img className="imageWidth" src={require('../../../assets/images/join.png')}/>
                </div>
            </div>
            <div className="imageCaption">
                <Typography style={{textAlign:'center'}} variant="headline" id="tableTitle">
                    회원가입
                </Typography>
            </div>
            <ReduxForm 
                onSubmit={onSubmit}
                formStyle={formStyle}
                buttonWrapStyle={buttonWrapStyle}
                formFields={formFields}
                buttonFields={buttonFields}
                validate={validate}
                asyncValidate={asyncValidate}
            >
            </ReduxForm>
        </div>

    );
}