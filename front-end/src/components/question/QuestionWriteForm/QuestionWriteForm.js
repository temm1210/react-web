import React from 'react'
import * as baseFields from './questionWriteFields';
import ReduxForm from 'components/common/ReduxForm';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import './QuestionWriteForm.scss'

// onSubmit, onGoBack = props
export default ( {onSubmit, onGoBack} ) => {

    // 만들폼의 속성이랑 컴포넌트를 정의.
    const formFields = [
        {
            name        : "username",
            label       : "아이디",
            component   : baseFields.renderTextField
        },
        {
            name        : "title",
            label       : "제목",
            component   : baseFields.renderTextField
        },
        {
            name        : "boardField",
            label       : "게시판 선택",
            labelWidth  : 80,
            component   : baseFields.renderSelectField,
            childrens   : [
                {
                    component   : MenuItem,
                    value       : "Ten",
                    elementText : "Ten"
                },
                {
                    component   : MenuItem,
                    value       : "Twenty",
                    elementText : "Twenty"
                },
                {
                    component   : MenuItem,
                    value       : "Thirty",
                    elementText : "Thirty"
                }
            ]
        },
        {
            name        : 'content',
            component   : baseFields.renderEditor,
            label       : "Content"
        }
    ];
    
    // 만들폼의 버튼을 정의
    const buttonFields = [
        {
            type    : "submit",
            text    : "submit",
            color   : "primary",
            variant : "contained",
        },
        {
            text    : "cancel",
            color   : "secondary",
            variant : "contained",
            onClick : onGoBack
        }
    ]

    const formStyle = {
        margin:20,
        background:'white',
        padding:20,
        boxShadow: 'rgba(140, 140, 140, 0.4) 0.8px 0.5px 0.6px',
        border:'1px solid rgba(140,140,140, .4)',
        maxWidth: 800,
        width: '100%'
    }

    const buttonWrapStyle = {
        textAlign:'center'
    }
    
    
    // 폼검증
    const validate = values => {
        const errors = {};
        const requiredFields = formFields.map(formInfo => formInfo.name);
        
        requiredFields.forEach(field => {
            if (!values[ field ]) {
                errors[ field ] = 'Required'
            }
        })
        return errors
    }
    return (
        <div className="questionWriteWrap">
            <ReduxForm 
                formStyle={formStyle}
                buttonWrapStyle={buttonWrapStyle}
                onSubmit={onSubmit}
                formFields={formFields}
                buttonFields={buttonFields}
                validate={validate} >
                    <Typography style={{textAlign:'center'}} variant="headline" id="tableTitle">
                        질문하기
                    </Typography>
            </ReduxForm>
        </div>
    )
};
