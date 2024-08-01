import PropTypes from 'prop-types';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import FormControlLabel from '@mui/material/FormControlLabel';

import { fDateTime } from 'src/utils/format-time';
import { Checkbox } from '@mui/material';

// ----------------------------------------------------------------------

export default function AnalyticsOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <OrderItem key={item.id} check_handler={item.checkHandler}  name={title} item={item} lastTimeline={index === list.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
}

AnalyticsOrderTimeline.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function OrderItem({check_handler, item, lastTimeline }) {
  const { type, title, time } = item;
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = () => {
    setChecked(!checked);
    check_handler(title);
  };
  return (
    <>
    <TimelineItem>
      <TimelineSeparator>
      <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
          label={title}
          sx={{ flexGrow: 1, m: 0 }}
        />

        {/* <TimelineDot
          color={
            (type === 'order1' && 'primary') ||
            (type === 'order2' && 'success') ||
            (type === 'order3' && 'info') ||
            (type === 'order4' && 'warning') ||
            'error'
          }
        /> */}
        {lastTimeline ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        {/* <Typography variant="subtitle2">{title}</Typography> */}

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
    </>
  );
  
}

OrderItem.propTypes = {

   check_handler: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  lastTimeline: PropTypes.bool.isRequired,
};
