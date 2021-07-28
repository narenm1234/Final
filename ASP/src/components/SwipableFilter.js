import React from 'react';
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
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    filterStyles: {
        position: 'absolute',
        top: "90px",
        left: "320px",
        margin: '20px',
    },
    textField: {
        width: "216px",
        borderRadius: "4px",
        border: "solid 1px #dddbda",
        backgroundColor: "#ffffff",
    },
    updateButton: {
        width: "61px",
        height: "32px",
        padding: "1px 13.5px",
        borderRadius: "4px",
        color: "#ffffff!important",
        backgroundColor: "#c23934!important",
    },
    cancelButton: {
        width: "61px",
        height: "32px",
        padding: "1px 13.5px",
        borderRadius: "4px",
        color: "#ffffff!important",
    },
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
        width: '65px',
        height: '10px',
        marginRight: '5px',
        padding: '10px 12px',
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);
export default function SwipableFilter() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
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
                        <BootstrapInput placeholder="Enter full or partial VIN" id="vin-input" />
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl>
                        <InputLabel shrink htmlFor="vin-input">
                            Year Range
                        </InputLabel>
                        <SmallInput placeholder="From" id="vin-input" />

                    </FormControl>
                    <FormControl className={classes.inline}>
                        <SmallInput placeholder="To" id="vin-input" />
                    </FormControl>
                </ListItem>

                <ListItem button>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Make
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            className={classes.selectEmpty}
                            displayEmpty
                            value={age}
                            onChange={handleChange}
                        >

                            <MenuItem value="" disabled>
                                Select All that Apply
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Inspection Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            className={classes.selectEmpty}
                            displayEmpty
                            value={age}
                            onChange={handleChange}
                        >

                            <MenuItem value="" disabled>
                                Select All that Apply
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl>
                        <InputLabel shrink htmlFor="Inspection-input">
                            Inspection Date
                        </InputLabel>
                        <SmallInput placeholder="From" id="Inspection-input" />

                    </FormControl>
                    <FormControl className={classes.inline}>
                        <SmallInput placeholder="To" id="Inspection-input" />
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Grounding Region
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            className={classes.selectEmpty}
                            displayEmpty
                            value={age}
                            onChange={handleChange}
                        >

                            <MenuItem value="" disabled>
                                Select All that Apply
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem button>
                    <FormControl>
                        <InputLabel shrink htmlFor="vin-input">
                            Auction Code
                        </InputLabel>
                        <BootstrapInput placeholder="Enter code" id="vin-input" />
                    </FormControl>
                </ListItem>
            </List>
            <List>
                <Button autoFocus className={classes.cancelButton} color="primary">
                    Cancel
                </Button>
                <Button autoFocus className={classes.updateButton} color="secondary">
                    Update
                </Button>
            </List>
        </div>
    );

    return (
        <div className={classes.filterStyles}>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor} >
                    <Button onClick={toggleDrawer(anchor, true)}>{"Filter Results"}</Button>
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
