import { Slide } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import AddEventCard from 'containers/Portal/components/AddEvent/components/AddEventCard';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class AddEvent extends PureComponent {
  state = {};

  componentDidMount = () => {
    this.portalSm = {
      fullScreen: true,
      TransitionComponent: Slide,
      TransitionProps: { direction: 'up' },
    };
  };

  handleCloseDialog = () => PORTAL_HELPERS.close(this.props);

  render = () => {
    const { classes, smDown, ...props } = this.props;

    const mobileProps = LOGIC_HELPERS.ifElse(smDown, this.portalSm, {});

    return (
      <Dialog open fullScreen onClose={this.handleCloseDialog} {...mobileProps}>
        <AddEventCard {...props} onClose={this.handleCloseDialog} />
      </Dialog>
    );
  };
}

AddEvent.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props

  // resaga props
};

AddEvent.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'AddEvent' }),
  withSMDown,
  resaga(CONFIG),
)(AddEvent);
