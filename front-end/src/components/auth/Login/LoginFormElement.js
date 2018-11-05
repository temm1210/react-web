import React from 'react'
import TextField from '@material-ui/core/TextField'

export const renderTextField = ({ input, style, label, meta: { touched, error }, ...custom }) => (
    <TextField
        label={label}
        {...input}
        {...custom}
        fullWidth
        inputProps={{style}}
        error={touched && !!error}
        helperText={touched && error}
        margin="normal"
        variant="outlined"
    />
)
