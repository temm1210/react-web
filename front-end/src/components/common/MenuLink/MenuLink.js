import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import {ListItem,ListItemText,ListItemIcon} from '@material-ui/core';
import { QuestionAnswer as QuestionAnswerIcon } from '@material-ui/icons';

const CustomLink = (({button, path, handleDrawerClose,history}) => {
    console.log('button:',button)
    return (
        <ListItem
            button={button}
            onClick={() => {
                handleDrawerClose();
                history.push(`/${path}/1`)
            }} 
        >
            <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
            <ListItemText primary="Q&A" />
        </ListItem>
    )
})

export default compose(
    withRouter,
    withProps(({path}) => ({ button: true, path})) 
)(CustomLink);