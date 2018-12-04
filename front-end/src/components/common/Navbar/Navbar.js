import React from 'react';
import MenuLink from 'components/common/MenuLink';
import navbarImage from 'assets/images/navbar.jpg'
import { withStyles } from '@material-ui/core/styles';
import {IconButton, Divider, Drawer} from '@material-ui/core';
import {ChevronRight as ChevronRightIcon,ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import { QuestionAnswer as QuestionAnswerIcon } from '@material-ui/icons';

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
        
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
    },
    image: {
        backgroundImage:`url(${navbarImage})`,
        position: "fixed",
        opacity:.2,
        height:"100%",
        width: "100%"
    },
    color: {
        zIndex:-1,
        background: 'black',
        position: "fixed",
        width: "100%",
        height:"100%"
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
    <div className = {classes.image}></div>
    <div className = {classes.color}/>
    <div className={classes.drawerHeader}>
        <IconButton style={{color:'white'}} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    </div>
    <Divider style={{background:"rgba(255,255,255,.4)", marginBottom:"15px"}}/>          
        <MenuLink icon= {<QuestionAnswerIcon/>} path="questionlist" diplayText="Q&A" handleDrawerClose={handleDrawerClose}/>    
        {/* <MenuLink path="questionget" diplayText="POST" handleDrawerClose={handleDrawerClose}/> */}
    </Drawer>
)

export default withStyles(styles, { withTheme: true })(NavBar)

