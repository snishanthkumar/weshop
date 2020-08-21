import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cup_1 from '../assets/images/cup_1.jpg';
import cup_2 from '../assets/images/cup_2.jpg';
import fridge_1 from '../assets/images/fridge_1.jpg';
import bed_1 from '../assets/images/bed_1.jpg';
import Tooltip from '@material-ui/core/Tooltip';

import { getData } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import '../styles/header.scss'


const drawerWidth = 250;

/** Custom styles */
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        marginRight: theme.spacing(2),
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
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


class Header extends Component {

    state = {
        open: false
    }

    componentWillMount() {
        // this.props.getData();
    }

    /** Function to open side drawer (Menu) */
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    /** Function to close side drawer (Menu) */
    handleDrawerClose = () => {
        this.setState({ open: false });

    };


    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            weShop
                  </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List className="main_list">
                        {['Collection', 'Color', 'Category', 'Price Range'].map((text, index) => (

                            <ListItem button key={text} className="sub_list">
                                <ListItemText primary={text} />
                                <ListItemIcon>{text !== 'Price Range' ? <ExpandMoreIcon /> : null}</ListItemIcon>
                                <Divider />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <div className="row home">
                        <div className="home_in col-lg-3 col-md-4 col-sm-6 ">
                            <Tooltip title="click to View" aria-label="View">
                                <img src={cup_1} alt="cups" width="250" height="250" />
                            </Tooltip>
                            <span className="text_desc">Combo 0f 7 cups</span>
                        </div>
                        <div className="home_in col-lg-3 col-md-4 col-sm-6">
                            <Tooltip title="click to View" aria-label="View">
                                <img src={cup_2} alt="cups" width="250" height="250" />
                            </Tooltip>
                            <span className="text_desc">High quality cups</span>
                        </div>
                        <div className="home_in col-lg-3 col-md-4 col-sm-6">
                            <Tooltip title="click to View" aria-label="View">
                                <img src={fridge_1} alt="cups" width="250" height="250" />
                            </Tooltip>
                            <span className="text_desc">weShop newly launched Fridge</span>
                        </div>
                        <div className="home_in col-lg-3 col-md-4 col-sm-6">
                            <Tooltip title="click to View" aria-label="View">
                                <img src={bed_1} alt="cups" width="250" height="250" />
                            </Tooltip>
                            <span className="text_desc">Bed</span>
                        </div>

                    </div>
                </main>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    ...state
})
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        ...bindActionCreators({ getData }, dispatch)
    }

}

export default withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Header));