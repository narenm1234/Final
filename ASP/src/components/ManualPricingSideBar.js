import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
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
export default function ManualPricingSideBar() {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();
    const handleClick = () => {
        //setOpen(!open);
    };
    const handleOnChange = (event) => {
        setFilterInput({ ...filterInput, ...{ [event.target.name]: event.target.value } });
    };
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
    return (
        <div className="manualPricingSidebar">
            <ListItem className="notesSectionHeader">
                Manual Pricing
            </ListItem>
            <ListItem button>
                <FormControl>
                    <InputLabel shrink htmlFor="vin-input">
                        Market Price
                    </InputLabel>
                    <BootstrapInput
                        placeholder="Enter price"
                        id="EntermarketPrice-input"
                        name="EntermarketPrice"
                        value={filterInput.vin}
                        onChange={handleOnChange}
                    />
                </FormControl>
            </ListItem>
            <ListItem button>
                <FormControl>
                    <InputLabel shrink htmlFor="vin-input">
                        Re-Enter Market Price
                    </InputLabel>
                    <BootstrapInput
                        placeholder="Enter Price"
                        id="reEntermarketPrice-input"
                        name="reEntermarketPrice"
                        value={filterInput.vin}
                        onChange={handleOnChange}
                    />
                </FormControl>
            </ListItem>
            <ListItem button>
                <FormControl>
                    <InputLabel shrink htmlFor="vin-input">
                        MMR
                    </InputLabel>
                    <BootstrapInput
                        placeholder="MMR"
                        id="vin-input"
                        name="vin"
                        value={filterInput.vin}
                        onChange={handleOnChange}
                    />
                </FormControl>
            </ListItem>
            <Divider variant="middle" />
            <ListItem >
                <p className="manualPricing">TFS Carfax Alert Status:</p>
            </ListItem>

            <ListItem >
                <p className="manualPricing">Autograde: 3.0</p>
            </ListItem>
            <ListItem >
                <p className="manualPricing">Grounding Dealer State: TX</p>
            </ListItem>
            <Divider variant="middle" />
            <ListItem>
                <div>
                    <h3>Price History</h3>
                </div>
            </ListItem>
            <ListItem>
                <div className="manualPricingText">
                    <p className="manualPricing">Price Entry Date/Time</p>
                    <p className="manualPricing">Price: $00,000.00</p>
                    <p className="manualPricing">User Name: First, Last</p>
                </div>
            </ListItem>
            <ListItem>
                <div className="manualPricingText">
                    <p className="manualPricing">Price Entry Date/Time</p>
                    <p className="manualPricing">Price: $00,000.00</p>
                    <p className="manualPricing">User Name: First, Last</p>
                </div>

            </ListItem>
            <List className="swipeFilterBtn">
                <Button autoFocus className="cancelButton" color="primary">
                    Cancel
                </Button>
                <Button autoFocus className="updateButton" color="secondary" >
                    Update
                </Button>
            </List>
        </div>
    )
}