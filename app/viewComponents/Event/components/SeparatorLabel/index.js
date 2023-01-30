import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'components/material-ui';
import P from 'viewComponents/Typography';
import style from './style';

export class SeparatorLabel extends React.PureComponent {
  render = () => {
    const {
      classes,
      children,
      vertical,
      marginRight,
      marginBottom,
      ...rest
    } = this.props;
    return (
      !!children && (
        <P
          className={classNames(
            classes.p,
            vertical && classes.vertical,
            marginRight && classes.marginRight,
            marginBottom && classes.marginBottom,
          )}
          weight="bold"
          transform="uppercase"
          dense
          {...rest}
        >
          {children}
        </P>
      )
    );
  };
}

SeparatorLabel.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  children: PropTypes.any,
  vertical: PropTypes.bool,
  marginRight: PropTypes.bool,
  marginBottom: PropTypes.bool,
};

SeparatorLabel.defaultProps = {
  children: null,
  vertical: false,
  marginRight: false,
  marginBottom: false,
};

export default withStyles(style, {
  name: 'viewComponents/Event/SeparatorLabel',
})(SeparatorLabel);
