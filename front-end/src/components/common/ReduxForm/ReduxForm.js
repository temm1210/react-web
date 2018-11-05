import React from 'react';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import { Field } from 'redux-form';
import FormHelperText from '@material-ui/core/FormHelperText';

let validator;
let asyncValidator;

const MaterialUiForm = (props) => {
    const { errorMsg,children, handleSubmit,asyncValidate,onSubmit, formFields, buttonWrapStyle, validate, buttonFields,formStyle } = props
    validator = validate
    asyncValidator = asyncValidate

    return (
        <div style={formStyle}>
            {children}
            <form onSubmit={handleSubmit(onSubmit)} >
                {
                    formFields.map((formInfo,index) => (
                        <div key={index}>
                            <Field {...formInfo}>
                                {
                                    formInfo.childrens ?
                                        formInfo.childrens.map(({component:ChildComponent, elementText, ...props},index) => (
                                            <ChildComponent key={index} {...props}>{elementText}</ChildComponent>
                                        )
                                    )
                                    :
                                    null
                                }
                            </Field>            
                        </div>
                    ))
                }
                {
                    errorMsg ? <FormHelperText error style={{textAlign:'center'}}>{errorMsg}</FormHelperText> : 
                                null
                }
                <div style={buttonWrapStyle}>
                    {
                        buttonFields.map((props, index) => {
                            const { text, ...buttonProps } = props;
                            return (
                                <Button
                                    style={{margin:10}}
                                    key={index}
                                    {...buttonProps}>
                                    {text}
                                </Button>
                            );                 
                        })
                    }
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'MaterialUiForm',  // a unique identifier for this form
    validator,
    asyncValidator
})(MaterialUiForm)