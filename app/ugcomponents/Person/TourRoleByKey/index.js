import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import styles from './styles';

export class TourRole extends PureComponent {
  render = () => {
    const { classes, role } = this.props;

    return <span className={classes.root}>{TOUR_ROLES[role]}</span>;
  };
}

TourRole.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  role: PropTypes.string.isRequired,

  // resaga props
};

TourRole.defaultProps = {};

export default compose(withStyles(styles, { name: 'TourRole' }))(TourRole);
