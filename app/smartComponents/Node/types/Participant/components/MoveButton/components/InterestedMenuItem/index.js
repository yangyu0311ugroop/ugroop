import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { VARIANTS } from 'variantsConstants';
import MenuItem from 'components/Popper/components/MenuItem';
import Name from 'smartComponents/Node/parts/Name';
import { H4 } from 'viewComponents/Typography';
import _ from 'lodash';
import styles from './styles';

export class InterestedMenuItem extends PureComponent {
  getRestProps = () => _.omit(this.props, ['classes', 'variant']);

  renderPart = (Component, variant, props = {}) => (
    <Component {...this.getRestProps()} variant={variant} {...props} />
  );

  renderRowValue = (value, userId) => (
    <H4
      dense
      weight={userId ? 'bold' : undefined}
      title={
        userId
          ? undefined
          : 'This follower is not yet connected to someone registered on uGroop.'
      }
    >
      {value}
    </H4>
  );

  render = () => {
    const {
      classes,
      openDialog,
      id,
      participantParentId,
      variant,
    } = this.props;
    return id !== participantParentId ? (
      <MenuItem button className={classes.item} onClick={openDialog(id)}>
        {this.renderPart(Name, variant, {
          renderValue: this.renderRowValue,
        })}
      </MenuItem>
    ) : null;
  };
}

InterestedMenuItem.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  variant: PropTypes.string,
  id: PropTypes.number,
  participantParentId: PropTypes.number,
  openDialog: PropTypes.func,
};

InterestedMenuItem.defaultProps = {
  variant: VARIANTS.TEXT_ONLY,
};

export default compose(withStyles(styles, { name: 'MoveButton/MenuItem' }))(
  InterestedMenuItem,
);
