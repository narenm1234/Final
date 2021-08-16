import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: "30px",
        height: "30px",
        backgroundColor: "#B80F0A",
        borderRadius: "50%",
        fontSize: "12px",
        padding: "10px 20px 13px 12px",
        color: "white",
    },
    sideBarCSS: {
        marginLeft: "16px",
    }
}));
export default function NewSidebar() {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className={classes.sideBarCSS}>
            {/* <ListItem component={Link} to="/home">
                <ListItemText
                    primary="Home"
                />
                <Chip className={classes.root} label="0"></Chip>
            </ListItem>
            <ListItem component={Link} to="/checkinvehicle">
                <ListItemText
                    primary="Check In vehicle"
                />
                <Chip className={classes.root} label="0"></Chip>
            </ListItem> */}
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItem button onClick={handleClick}>

                    {open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary="Grounded" />
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.sideBarCSS}>
                        <ListItem component={Link} to="/grounded" >
                            <ListItemText primary="Grounded" />
                            <Chip className={classes.root} label="4"></Chip>
                        </ListItem>
                        <ListItem component={Link} to="/passed" >
                            <ListItemText primary="Passed" />
                            <Chip className={classes.root} label="8"></Chip>
                        </ListItem>
                        <ListItem component={Link} to="/purchased" >
                            <ListItemText primary="Purchased" />
                            <Chip className={classes.root} label="9"></Chip>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItem button onClick={handleClick}>

                    {open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary="Admin" />
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.sideBarCSS}>
                        <ListItem component={Link} to="/adminSearch" >
                            <ListItemText primary="Vehicle Search" />
                            
                        </ListItem>
                        <ListItem component={Link} to="/adminInventoryRequests" >
                            <ListItemText primary="Inventory Requests" />
                            
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    )
}