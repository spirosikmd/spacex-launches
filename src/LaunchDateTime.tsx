import React from 'react';
import PropTypes from 'prop-types';

interface LaunchDateTimeProps {
  utcDate: Date;
  isTentative: boolean;
}

const LaunchDateTime = ({ utcDate, isTentative }: LaunchDateTimeProps) => {
  const utcString = utcDate.toUTCString();

  if (isTentative) {
    return (
      <span>
        {utcString
          .split(' ')
          .slice(0, 4)
          .join(' ')}
      </span>
    );
  }

  return <span>{utcString}</span>;
};

LaunchDateTime.propTypes = {
  utcDate: PropTypes.object.isRequired,
  isTentative: PropTypes.bool.isRequired,
};

export default React.memo(LaunchDateTime);
