import { withStyles } from 'components/material-ui';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { compose } from 'redux';
import without from 'lodash/without';
import resaga from 'resaga';
import { CONFIG, CREATED_BY_ME_CONFIG, IDS_CONFIG } from './config';
import styles from './styles';

export class VisibleChildren extends PureComponent {
  componentDidMount = () => {
    this.handleChange(this.props);
  };

  componentWillReceiveProps = nextProps => {
    const { visibleChildren, privateIds, hiddenIds } = this.props;

    if (
      !isEqual(visibleChildren, nextProps.visibleChildren) ||
      !isEqual(privateIds, nextProps.privateIds) ||
      !isEqual(hiddenIds, nextProps.hiddenIds)
    ) {
      this.handleChange(nextProps);
    }
  };

  handleChange = ({
    calculatedVisibleChildren,
    calculatedPrivateIds,
    calculatedHiddenIds,
    visibleChildren,
    privateIds,
    hiddenIds,
  }) => {
    const newVisibleChildren = without(visibleChildren, ...privateIds);

    if (!isEqual(calculatedVisibleChildren, newVisibleChildren)) {
      this.props.resaga.setValue({
        visibleChildren: newVisibleChildren,
      });
    }

    if (!isEqual(calculatedPrivateIds, privateIds)) {
      this.props.resaga.setValue({
        privateIds,
      });
    }

    if (!isEqual(calculatedHiddenIds, hiddenIds)) {
      this.props.resaga.setValue({
        onlyMedIds: hiddenIds,
      });
    }
  };

  render = () => null;
}

VisibleChildren.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  // id: PropTypes.number, // template id

  // resaga props
  // calculatedVisibleChildren: PropTypes.array,
  visibleChildren: PropTypes.array, // public tabs
  privateIds: PropTypes.array, // shared with organisers
  hiddenIds: PropTypes.array, // only me
};

VisibleChildren.defaultProps = {
  // calculatedVisibleChildren: [],
  visibleChildren: [],
  privateIds: [],
  hiddenIds: [],
};

export default compose(
  withStyles(styles, { name: 'VisibleChildren' }),
  resaga(IDS_CONFIG),
  resaga(CREATED_BY_ME_CONFIG),
  resaga(CONFIG),
)(VisibleChildren);
