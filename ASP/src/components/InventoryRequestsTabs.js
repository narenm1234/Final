import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ManualPricing from './ManualPricing';
import RRMApproval from './RRMApproval';
import MileageDisc from './MileageDisc'
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
        <Box p={3} pt={16}>
          {children}
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

export default function InventoryRequestsTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (props.location.state && props.location.state.pageName === 'RRMApproval') {
      setValue(1)
    } else if (props.location.state && props.location.state.pageName === 'Manual Pricing') {
      setValue(0)
    }
    else if (props.location.state && props.location.state.pageName === 'Mileage Discrepencies') {
      setValue(2)
    }
  }, [props.location.state && props.location.state.pageName]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position="fixed" className='topBarAdmin'>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className='tabset'>
          <Tab label="Awaiting Manual Pricing" {...a11yProps(0)} />
          <Tab label="RRM Approvals" {...a11yProps(1)} />
          <Tab label="Mileage Discrepencies" {...a11yProps(2)} />
          {/* <Tab label="No Inspections" {...a11yProps(3)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ManualPricing props={props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RRMApproval props={props} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MileageDisc props={props} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h2>No Inspections</h2>
      </TabPanel>
    </div>
  );
}
