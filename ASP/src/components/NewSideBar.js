import React, { useEffect } from 'react';
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
import { useLocation } from 'react-router-dom'

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
    },
    activeNavLink: {
        background: '#e7f3fd',
        borderLeft: '3px solid #407ed2',
    }
}));


const sidebarItems = [
    {
        label: 'Grounded',
        open: false,
        childs: [
            {
                label: "Grounded",
                link: "/grounded",
                badge: "4",
            },
            {
                label: "Passed",
                link: "/passed",
                badge: "8",
            },
            {
                label: "Purchased",
                link: "/purchased",
                badge: "9",
            },
        ]
    },
    {
        label: 'Admin',
        open: false,
        childs: [
            {
                label: "Vehicle Search",
                link: "/adminSearch",
                badge: "",
            },
            {
                label: "Inventory Requests",
                link: "/adminInventoryRequests",
                badge: "",
            }
        ]
    }
]


export default function NewSidebar() {
    const location = useLocation();
    const [list, setList] = React.useState([]);
    const [open, setOpen] = React.useState([]);
    const [activeChild, setActiveChild] = React.useState(location.pathname);
    const classes = useStyles();

    useEffect(() => {
        sidebarItems.forEach(item => {
            item.childs.forEach(child => {
                if (activeChild == child.link) {
                    item.open = true;
                }
            })
        });
        setList(sidebarItems);
    }, [])

    const handleClick = (item) => {
        let updatedList = list.map(litem => {
            if (litem.label === item.label) {
                litem.open ? litem.open = false : litem.open = true;
            }
            return litem;
        })
        setList(updatedList);
    };

    const handleClickMakeActive = (child) => {
        setActiveChild(child.link)
    }


    return (
        <div className={classes.sideBarCSS}>
            {list && list.map((item, index) =>
                <List key={index} component="nav" aria-labelledby="nested-list-subheader" >
                    <ListItem button onClick={() => { handleClick(item) }}>
                        {item.open ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText primary={item.label} />
                    </ListItem>
                    <Collapse in={item.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding className={classes.sideBarCSS}>
                            {item.childs.map(child =>
                                <ListItem component={Link} to={child.link} key={child.link}
                                    className={activeChild == child.link ? classes.activeNavLink : ''}
                                    onClick={() => { handleClickMakeActive(child) }}>
                                    <ListItemText primary={child.label} />
                                    {child.badge ? <Chip className={classes.root} label={child.badge}></Chip> : ''}
                                </ListItem>
                            )}
                        </List>
                    </Collapse>
                </List>
            )
            }
        </div>
    )
}