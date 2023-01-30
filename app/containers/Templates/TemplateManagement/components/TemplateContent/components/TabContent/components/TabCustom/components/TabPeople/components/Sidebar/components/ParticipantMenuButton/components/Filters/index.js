import { withStyles } from '@material-ui/core/styles';
import Participants from 'smartComponents/Node/components/ParticipantList';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class Filters extends PureComponent {
  componentWillUnmount() {
    /*
    this.props.resaga.setValue({
      participantViewModeModalFilter: null,
      participantViewModeModalMode: null,
      participantViewModeModalSortBy: null,
    }); */
  }

  render = () => (
    <Participants
      variant={this.props.variant}
      renderContent={this.props.children}
    />
  );
}

Filters.propTypes = {
  // hoc props
  // resaga: PropTypes.object.isRequired,
  // parent props
  variant: PropTypes.string,
  children: PropTypes.func,
  // resaga props
};

Filters.defaultProps = {
  variant: VARIANTS.FILTERS_ONLY,
};

export default compose(
  withStyles(styles, { name: 'Filters' }),
  resaga(CONFIG),
)(Filters);
