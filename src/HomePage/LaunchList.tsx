import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';
import Launch, { LaunchPropType } from './Launch';
import Image from '../Image';
import emptyListImage from './emptyList.png';
import { LaunchData } from '../api';

const styles = (theme: Theme) =>
  createStyles({
    launchList: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      position: 'relative' as 'relative',
    },
    timeline: {
      borderLeft: `1px solid ${theme.palette.grey[300]}`,
      position: 'absolute' as 'absolute',
      top: '6px',
      bottom: '6px',
      left: `${theme.spacing.unit + 4}px`,
      '&::before': {
        position: 'absolute' as 'absolute',
        content: '""',
        borderLeft: `1px dashed ${theme.palette.grey[300]}`,
        top: '-13px',
        left: '-1px',
        height: '12px',
      },
      '&::after': {
        position: 'absolute' as 'absolute',
        content: '""',
        borderLeft: `1px dashed ${theme.palette.grey[300]}`,
        bottom: '-13px',
        left: '-1px',
        height: '12px',
      },
    },
    launchItem: {
      padding: `${theme.spacing.unit * 2}px 0`,
    },
  });

interface LaunchListProps extends WithStyles<typeof styles> {
  launches: LaunchData[];
}

const LaunchList = ({ classes, launches }: LaunchListProps) => {
  if (launches.length === 0) {
    return <Image src={emptyListImage} alt="No launches..." />;
  }

  return (
    <div className={classes.launchList}>
      <div className={classes.timeline} />
      {launches.map(launch => (
        <div key={launch.flightNumber} className={classes.launchItem}>
          <Launch launch={launch} />
        </div>
      ))}
    </div>
  );
};

LaunchList.propTypes = {
  classes: PropTypes.object.isRequired,
  launches: PropTypes.arrayOf(PropTypes.shape(LaunchPropType)).isRequired,
};

export default withStyles(styles)(React.memo(LaunchList));
