import React from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

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

export const renderCheckbox = ({ input, label }) => (
    <FormControlLabel
        control={
        <Checkbox
            checked={input.value ? true : false}
            onChange={input.onChange}
            color="primary"/>
        }
        label={label}
    />
)

export const renderRadioGroup = ({ input,children, ...rest }) => (
    <RadioGroup {...input} {...rest}
        value={input.value}
        onChange={(event, value) => input.onChange(value)}>
        {children}    
    </RadioGroup>
   
)

export const renderSelectField = ({input,labelWidth, label,children, meta: { touched, error }, ...custom }) => (
    <FormControl fullWidth margin="normal" error={touched && !!error}  variant="outlined">
        <InputLabel htmlFor="name-select">{label}</InputLabel>
        <Select
            {...input}
            {...custom}
            name={label}
            labelWidth={labelWidth}
            input={
                <OutlinedInput
                    name="age"
                    id="name-select"/>
            }>
            {children}
        </Select>
        {
            touched && !!error ? (<FormHelperText>{error}</FormHelperText>) : (null)
        }
    </FormControl>
)
