import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AdminDetailedReport from '../pages/AdminDetailedReport';
import StatusHistory from './StatusHistory';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function VehicleSearchTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    console.log("aaaa",props)

    const{inspectiondata}=props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <AppBar position="fixed" className='topBarAdmin'>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Vehicle Summary" {...a11yProps(0)} />
                    <Tab label="Status History" {...a11yProps(1)} />
                    <Tab label="Update Mileage/price" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <AdminDetailedReport inspectiondata={inspectiondata}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className='adminTabsSection'><StatusHistory /></div>

            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className='adminTabsSection'>Update Mileage/price</div>
            </TabPanel>
        </div>
    );
}
