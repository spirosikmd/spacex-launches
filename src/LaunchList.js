import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Launch, { LaunchPropType } from './Launch';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  line: {
    borderLeft: `1px solid ${theme.palette.grey[300]}`,
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '50%',
  },
  launchRoot: {
    display: 'flex',
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  launch: {
    width: '50%',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
});

export const LaunchList = ({ classes, launches }) => {
  if (launches.length === 0) {
    return <Typography>No launches...</Typography>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.line} />
      {launches.map((launch, index) => {
        const shouldRenderReverse = (index + 1) % 2 === 0;
        const launchRootClassName = classnames(classes.launchRoot, {
          [classes.reverse]: shouldRenderReverse,
        });

        return (
          <div key={launch.flightNumber} className={launchRootClassName}>
            <div className={classes.launch}>
              <Launch launch={launch} reverse={shouldRenderReverse} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

LaunchList.propTypes = {
  classes: PropTypes.object.isRequired,
  launches: PropTypes.arrayOf(PropTypes.shape(LaunchPropType)).isRequired,
};

export default withStyles(styles)(React.memo(LaunchList));
