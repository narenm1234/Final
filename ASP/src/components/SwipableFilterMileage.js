import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    inline: {
        display: "inline-block",
        marginTop: '25px',
    },
    inlineDate: {
        display: "inline-block",
        marginTop: '135px',
    },
    list: {
        width: 264,
        height: "100%",
        paddingBottom: "64px",
        position: "relative",
    },
    fullList: {
        width: 'auto',
    },
    filterStyles: {
        display: "flex",
        alignContent: "center",
        paddingBottom: 10
    },
    textField: {
        width: "216px",
        borderRadius: "4px",
        border: "solid 1px #dddbda",
        backgroundColor: "#ffffff",
    },
    updateButton: {
        padding: "4px 8px",
        minWidth: "114px",
        borderRadius: "4px",
        color: "#ffffff!important",
        backgroundColor: "#c23934!important",
    },
    cancelButton: {
        padding: "4px 8px",
        minWidth: "88px",
        borderRadius: "4px",
        color: "#0070d2!important",
        border: "solid 1px #dddbda",
        backgroundColor: "#ffffff",
    },
    searchBlock: {
        border: "solid 1px #dddbda",
        backgroundColor: "#ffffff",
        boxShadow: "none",
    },
    customSelect: {
        marginTop: "24px",
        color: "#706e6b",
        fontSize: "13px",
    },
    selectFormControl: {
        width: "100%"
    },
    iconButton: {
        padding: "2px 12px"
    },
    filterInput: {
        height: "32px",
    },
    swipeFilterBtn: {
        position: "absolute",
        bottom: "0",
        left: "0px",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        background: "#FFF",
    },
    filterResultText: {
        color: "#006dcc",
        fontSize: "13px",
        lineHeigt: "20px",
        fontWeight: "500",
        textTransform: "lowercase",
        marginLeft: "16px",
    }
});

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: "#ffffff",
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        height: '10px',
        padding: '10px 12px',
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

const SmallInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: "#ffffff",
        border: '1px solid #ced4da',
        fontSize: 16,
        display: 'inline-block',
        minWidth: '65px',
        height: '10px',
        marginRight: '5px',
        padding: '10px 12px',
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

export default function SwipableFilterMileage() {
    const classes = useStyles();
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [filterInput, setFilterInput] = useState({
        vin: '',
        yearFrom: '',
        yearTo: '',
        make: '',
        inspectionStatus: '',
        inspectionDateFrom: '',
        inspectionDateTo: '',
        groundingRegion: '',
        auctionCode: ''
    });
    const [makeOptions, setMakeOptions] = useState([
        { value: 'audi', text: 'Audi' },
        { value: 'bmw', text: 'BMW' },
        { value: 'benz', text: 'Benz' }
    ]);
    const [inspectionStatusOptions, setInspectionStatusOptions] = useState([
        { value: 'pending', text: 'Pending' },
        { value: 'completed', text: 'Completed' }
    ]);
    const [groundingRegionOptions, setGroundingRegionOptions] = useState([
        { value: 'texas', text: 'Texas' },
        { value: 'florida', text: 'Florida' },
        { value: 'indiana', text: 'Indiana' }
    ]);
    const [searchtext, setSearchtext] = useState("");

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleOnChange = (event) => {
        setFilterInput({ ...filterInput, ...{ [event.target.name]: event.target.value } });
    };

    const handleOnSubmit = () => {
        console.log(filterInput);
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, { [classes.fullList]: anchor === 'top' || anchor === 'bottom' })}
            role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Filter Options'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <FormControl>
                        <InputLabel shrink htmlFor="vin-input">
                            VIN
                        </InputLabel>
                        <BootstrapInput
                            placeholder="Enter full or partial VIN"
                            id="vin-input"
                            name="vin"
                            value={filterInput.vin}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl>
                        <InputLabel shrink htmlFor="year-input">
                            Year Range
                        </InputLabel>
                        <SmallInput
                            placeholder="From"
                            id="year-from-input"
                            name="yearFrom"
                            value={filterInput.yearFrom}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                    <FormControl className={classes.inline}>
                        <SmallInput
                            placeholder="To"
                            id="year-to-input"
                            name="yearTo"
                            value={filterInput.yearTo}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl className={classes.selectFormControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Make
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            className={classes.customSelect}
                            variant="outlined"
                            displayEmpty
                            name="make"
                            value={filterInput.make}
                            onChange={handleOnChange}
                        >
                            <MenuItem value="" disabled>
                                Select All that Apply
                            </MenuItem>
                            {makeOptions.map(make => (
                                <MenuItem value={make.value}>{make.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl className={classes.selectFormControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Inspection Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            className={classes.customSelect}
                            variant="outlined"
                            displayEmpty
                            name="inspectionStatus"
                            value={filterInput.inspectionStatus}
                            onChange={handleOnChange}
                        >
                            <MenuItem value="" disabled>
                                Select All that Apply
                            </MenuItem>
                            {inspectionStatusOptions.map(inspectionStatus => (
                                <MenuItem value={inspectionStatus.value}>{inspectionStatus.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl>
                        <InputLabel shrink htmlFor="Inspection-input">
                            Inspection Date
                        </InputLabel>
                        <SmallInput
                            placeholder="From"
                            id="Inspection-input"
                            name="inspectionDateFrom"
                            value={filterInput.inspectionDateFrom}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                    <FormControl className={classes.inline}>
                        <SmallInput
                            placeholder="To"
                            id="Inspection-input"
                            name="inspectionDateTo"
                            value={filterInput.inspectionDateTo}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl className={classes.selectFormControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Grounding Region
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            className={classes.customSelect}
                            displayEmpty
                            variant="outlined"
                            name="groundingRegion"
                            value={filterInput.groundingRegion}
                            onChange={handleOnChange}
                        >
                            <MenuItem value="" disabled>
                                Select All that Apply
                            </MenuItem>
                            {groundingRegionOptions.map(groundingRegion => (
                                <MenuItem value={groundingRegion.value}>{groundingRegion.text}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl>
                        <InputLabel shrink htmlFor="auction-code-input">
                            Auction Code
                        </InputLabel>
                        <BootstrapInput
                            placeholder="Enter code"
                            id="auction-code-input"
                            name="auctionCode"
                            value={filterInput.auctionCode}
                            onChange={handleOnChange}
                        />
                    </FormControl>
                </ListItem>
            </List>
            <List className={classes.swipeFilterBtn}>
                <Button autoFocus className={classes.cancelButton} color="primary">
                    Cancel
                </Button>
                <Button autoFocus className={classes.updateButton} color="secondary" onClick={handleOnSubmit}>
                    Update
                </Button>
            </List>
        </div>
    );

    const handleSearchText = (value) => {
        setSearchtext(value)
    }

    return (
        <div className={classes.filterStyles}>
            <Paper component="form" className={classes.searchBlock}>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    className={classes.filterInput}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'Search' }}
                    onChange={(evt) => handleSearchText(evt.target.value)}
                />
            </Paper>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor} >
                    <Button className={classes.filterResultText} onClick={toggleDrawer(anchor, true)}>{"Filter Results"}</Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
