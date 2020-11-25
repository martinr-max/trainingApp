import React, {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PastTrainingTable from '../past-training-table/Past-training-table';
import CurrentTrainingTab from '../current-training/current-training-tab/CurrentTrainingTab';
import { TabPanel } from '../../TabPanel/TabPanel';

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TrainingTab() {
  
  const theme = useTheme();
  const [value, setValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setValue(index);
  };
  
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Current Training" {...a11yProps(0)} />
          <Tab label="Past Training" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleTabChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <CurrentTrainingTab/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <PastTrainingTable  />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}