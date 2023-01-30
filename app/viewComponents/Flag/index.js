import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PhoneFlag from 'react-phone-number-input/modules/Flag';
import { withStyles } from 'components/material-ui';

const styles = {
  root: {
    '& > .react-phone-number-input__icon-image': {
      width: '1.42em',
    },
  },
  paddingRight: {
    paddingRight: 8,
  },
};

export class Flag extends React.PureComponent {
  render = () => {
    const { classes, country, paddingRight } = this.props;
    return (
      <span
        className={classNames(
          classes.root,
          paddingRight && classes.paddingRight,
        )}
      >
        <PhoneFlag
          country={country}
          flagsPath="https://lipis.github.io/flag-icon-css/flags/4x3/"
        />
      </span>
    );
  };
}

Flag.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  country: PropTypes.string,
  paddingRight: PropTypes.bool,
};

Flag.defaultProps = {
  country: 'AU',
  paddingRight: false,
};

export default withStyles(styles, { name: 'viewComponents/Flag' })(Flag);
