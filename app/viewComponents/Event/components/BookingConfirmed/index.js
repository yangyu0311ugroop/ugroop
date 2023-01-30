/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classnames from 'classnames';
import { FormattedMessage as M } from 'react-intl';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Icon from 'ugcomponents/Icon';
import style from './style';
import m from './messages';

export class BookingConfirmed extends React.PureComponent {
  renderIconOnly = () => {
    const { classes, className } = this.props;
    return (
      <div className={classnames(classes.iconRoot, className)}>
        <Icon size="xsmall" icon="checkmark-circle" bold />
      </div>
    );
  };

  renderIconAndLabel = () => {
    const { classes } = this.props;
    return (
      <GridContainer className={classes.cardRoot} alignItems="center">
        <GridItem>
          <M {...m.confirmedLabel} />
        </GridItem>
        <GridItem>
          <Icon size="normal" icon="checkmark-circle" />
        </GridItem>
      </GridContainer>
    );
  };

  renderIconAndValue = () => {
    const { classes, value } = this.props;
    return (
      <GridContainer className={classes.cardRoot} alignItems="center">
        <GridItem>
          <M {...m.bookingLabel} />
          {value}
        </GridItem>
        <GridItem>
          <Icon size="normal" icon="checkmark-circle" />
        </GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { iconOnly, iconAndValue } = this.props;
    if (iconOnly) return this.renderIconOnly();
    if (iconAndValue) return this.renderIconAndValue();
    return this.renderIconAndLabel();
  };
}

BookingConfirmed.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  iconOnly: PropTypes.bool,
  iconAndValue: PropTypes.bool,
  className: PropTypes.string,
  value: PropTypes.string,
};

BookingConfirmed.defaultProps = {
  iconOnly: false,
  iconAndValue: false,
};

export default compose(
  withStyles(style, { name: 'viewComponents/Event/BookingConfirmed' }),
)(BookingConfirmed);
