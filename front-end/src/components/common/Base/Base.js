import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Navbar from 'components/common/Navbar';
import {Button,IconButton,Typography,Toolbar,AppBar,CssBaseline} from '@material-ui/core';
import {
    AccountCircle as AccountCircleIcon,
    PowerSettingsNew as PowerSettingsNewIcon,
    Menu as MenuIcon
} from '@material-ui/icons';
import './Base.scss';
import Footer from 'components/common/Footer';


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
        const { classes,children,isLogged,onLogout} = this.props;
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
                    <Navbar open={open} handleDrawerClose={this.handleDrawerClose}/>
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

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);