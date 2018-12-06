import React from 'react';
import TextField from '@material-ui/core/TextField'
import CKEditor from 'components/common/Editor';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export const renderEditor = ( {input} ) => {
    return (
        <CKEditor
            idNumber={2}
            data={input.value}
            onChange={data => input.onChange(data)}
            init={{
                ckfinder: {
                    uploadUrl:'/upload'
                }
            }}
        /> 
    );
};

export const renderListItem = ({ label}) => (
    <ListItem>
        <ListItemText
           primary={
                <Typography type="body2" style={{ color: '#2a6496' }}>
                    { label}
                </Typography>
            }
        />
    </ListItem>
)

export const renderTextField = ({ input, label, ...custom }) => (
    <TextField
        label={label}
        {...input}
        {...custom}
        fullWidth
        margin="normal"
        variant="outlined"
    />
)