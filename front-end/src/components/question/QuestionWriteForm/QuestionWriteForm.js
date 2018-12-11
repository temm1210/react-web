import React from 'react'
import * as baseFields from './questionWriteFields';
import ReduxForm from 'components/common/ReduxForm';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import './QuestionWriteForm.scss'

// onSubmit, onGoBack = props
export default ( {onSubmit, onGoBack, username} ) => {

    // 만들폼의 속성이랑 컴포넌트를 정의.
    let formFields = [
        {
            name        : "username",
            label       : username,
            component   : baseFields.renderListItem,
            disabled    : true
        },
        {
            name        : "title",
            label       : "제목",
            component   : baseFields.renderTextField
        },
        // {
        //     name        : "boardField",
        //     label       : "게시판 선택",
        //     labelWidth  : 80,
        //     component   : baseFields.renderSelectField,
        //     childrens   : [
        //         {
        //             component   : MenuItem,
        //             value       : "question",
        //             elementText : "Q&A"
        //         },
        //         {
        //             component   : MenuItem,
        //             value       : "post",
        //             elementText : "POST"
        //         },
        //     ]
        // },
        {
            name        : 'content',
            component   : baseFields.renderEditor,
            label       : "Content",
        }
    ];
    
    // 만들폼의 버튼을 정의
    const buttonFields = [
        {
            type    : "submit",
            id      : "questionSubmit",
            text    : "등록",
            color   : "primary",
            variant : "contained"
        },
        {
            text    : "취소",
            id      : "questionCancel",
            color   : "secondary",
            variant : "contained",
            onClick : onGoBack
        }
    ]

    const formStyle = {
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
    }

    const buttonWrapStyle = {
        textAlign:'center'
    }
    
    
    // 폼검증
    const validate = values => {
        const errors = {};
        const requiredFields = formFields.map(formInfo => {
            if(formInfo.component !== baseFields.renderListItem)
                return formInfo.name
        });
        
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
                validate={validate}
                >
                    <Typography style={{textAlign:'center'}} variant="h5" id="tableTitle">
                        질문하기
                    </Typography>
            </ReduxForm>
        </div>
    )
};
