import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    Button,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Divider,
    Typography,
    List,
    Toolbar,
    AppBar,
    CssBaseline,
    Drawer
} from '@material-ui/core';
import {
    QuestionAnswer as QuestionAnswerIcon,
    AccountCircle as AccountCircleIcon,
    PowerSettingsNew as PowerSettingsNewIcon,
    DeveloperBoard as DeveloperBoardIcon,
    ChevronRight as ChevronRightIcon,
    ChevronLeft as ChevronLeftIcon,
    Menu as MenuIcon
} from '@material-ui/icons';
import './Base.scss';
import Footer from 'components/common/Footer';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
    title:  {
        flex: 1
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        flexGrow: 1,
        padding: 0,
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        })
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    iconStyle: {
        fontSize:17,
        verticalAlign:'middle',
        marginRight:10
    },
    loginStyle: {
        marginRight:40
    },
    mainStyle: {
        
    }
});

class PersistentDrawerLeft extends React.Component {

    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme,children,isLogged,onLogout,history } = this.props;
        const { open } = this.state;

        const username = 'STW'
        const customTheme = createMuiTheme({ 
            palette: {
                primary: {
                        main: 'rgb(40,48,46)'
                    }
                }
            },
        )
        return (
            <div className="baseContainer">
                <MuiThemeProvider theme={customTheme}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography component={Link} style={{textDecoration:'none'}} to="/" button="true" variant="h6" color="inherit" noWrap className={classes.title}>
                            MyWeb
                        </Typography>
                        {
                            (function() {
                                if(isLogged) {
                                    return (
                                        <div>
                                            <span>      
                                                <Button color="inherit">
                                                    <AccountCircleIcon className={classes.iconStyle}/>
                                                    {username}님
                                                </Button>
                                            </span>
                                            <span>     
                                                <Button onClick={onLogout} color="inherit">
                                                    <PowerSettingsNewIcon className={classes.iconStyle}/>
                                                    LOGOUT
                                                </Button>
                                            </span>
                                        </div>
                                    )
                                } else {
                                    return <div><Button component={Link} to={"/login"} color="inherit" className={classes.loginStyle}>Login</Button></div>
                                }
                            })()
                        }
                    </Toolbar>
                    </AppBar>
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
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem 
                            button 
                            onClick={() => {
                                this.handleDrawerClose();
                                history.push(`/questionlist/1`)
                            }} 
                        >
                            <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
                            <ListItemText primary="Q&A" />
                        </ListItem>

                        <ListItem 
                            button
                            onClick={() => {
                                this.handleDrawerClose();
                                history.push('/postlist/1')
                            }}
                        >
                            <ListItemIcon><DeveloperBoardIcon /></ListItemIcon>
                            <ListItemText primary="POST" />
                        </ListItem>
                    </List>
                    </Drawer>
                </MuiThemeProvider>
                <main
                className={classNames(classes.content, {
                    [classes.contentShift]: open,
                })}
                >
                    <div className={classes.drawerHeader} />
                    {children}
                </main>
                <Footer/>
            </div>  
        );
    }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(PersistentDrawerLeft));