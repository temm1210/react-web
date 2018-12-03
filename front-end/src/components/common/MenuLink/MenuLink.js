import React from 'react';
import { withRouter } from 'react-router-dom';
import {ListItem,ListItemText,ListItemIcon} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const CustomLink = (({path,icon, handleDrawerClose,history,diplayText}) => {
    return (
        <ListItem
            button={true}
            onClick={() => {
                handleDrawerClose();
                history.push(`/${path}/1`)
            }} 
        >
            <ListItemIcon style={{color:'white'}}>{icon}</ListItemIcon>
            <ListItemText primary={<Typography variant="caption" style={{ color: 'white', fontSize:'16px' }}>{diplayText}</Typography>} />
        </ListItem>
    )
})
export default withRouter(CustomLink)

