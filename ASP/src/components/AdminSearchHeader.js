import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper , Box} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
        height: 35,
        margin: '7px 8px',
        border: "1px solid #ccc",
        borderRadius:"4px"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        fontSize: '14px',
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function AdminSearchHeader(props) {
    const classes = useStyles();
    const [searchtext, setSearchtext] = React.useState("");

    const handleSearchText = (value) => {
        console.log(props)
        props.searchdetails(value);
        setSearchtext(value)
        
    }
    if(!localStorage.getItem('dealerCode')){
    return (
        <Box component="form" className={classes.root}>
            <IconButton type="submit" className={classes.iconButton} aria-label="search" >
                <SearchIcon color="disabled" fontSize="small" />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Global Search by VIN"
                inputProps={{ 'aria-label': 'search vehicle by VIN' }}
                onChange={(evt) => props.searchdetails(evt.target.value)}
            />
        </Box>
    );
    }
    else 
    return (  
        <div>
            
        </div>
    );
}
