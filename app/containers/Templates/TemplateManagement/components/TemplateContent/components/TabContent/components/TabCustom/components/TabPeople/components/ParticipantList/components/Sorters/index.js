import { withStyles } from '@material-ui/core/styles';
import ParticipantList from 'smartComponents/Node/components/ParticipantList';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { CONFIG } from './config';
import styles from './styles';

export class Sorters extends PureComponent {
  componentDidMount() {}

  render = () => <ParticipantList variant={VARIANTS.SORTERS_ONLY} />;
}

Sorters.propTypes = {
  // hoc props
  // parent props
  // resaga props
};

Sorters.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Sorters' }),
  resaga(CONFIG),
)(Sorters);
