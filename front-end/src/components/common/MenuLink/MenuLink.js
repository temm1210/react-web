import React from 'react';
import { withRouter } from 'react-router-dom';
import {ListItem,ListItemText,ListItemIcon} from '@material-ui/core';

const CustomLink = (({path,icon, handleDrawerClose,history,diplayText}) => {
    return (
        <ListItem
            button={true}
            onClick={() => {
                handleDrawerClose();
                history.push(`/${path}/1`)
            }} 
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={diplayText} />
        </ListItem>
    )
})

export default withRouter(CustomLink)

