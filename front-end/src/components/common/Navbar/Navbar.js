import React from 'react';
import MenuLink from 'components/common/MenuLink';
import { withStyles } from '@material-ui/core/styles';
import {IconButton, Divider, Drawer} from '@material-ui/core';
import {ChevronRight as ChevronRightIcon,ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    drawerPaper: {
        width: drawerWidth,
    }
})

const NavBar = ({classes, theme, open,handleDrawerClose}) => (
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
            paper: classes.drawerPaper,
        }}
    >
    <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    </div>
    <Divider />          
        <MenuLink path="questionlist" handleDrawerClose={handleDrawerClose}/>    
    </Drawer>
)

export default withStyles(styles, { withTheme: true })(NavBar)

