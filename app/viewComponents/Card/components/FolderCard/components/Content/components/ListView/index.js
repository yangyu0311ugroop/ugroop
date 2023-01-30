import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ItemListView from 'ugcomponents/ItemListView';

import styles from './styles';

export class FolderListView extends PureComponent {
  render = () => {
    const { viewDelegate, classes, noULWrap } = this.props;
    return (
      <ItemListView
        noULWrap={noULWrap}
        className={classes.listViewRoot}
        viewDelegate={viewDelegate}
      />
    );
  };
}

FolderListView.propTypes = {
  classes: PropTypes.object,
  viewDelegate: PropTypes.object.isRequired,
  noULWrap: PropTypes.bool,
};

FolderListView.defaultProps = {
  classes: {},
  noULWrap: false,
};

export default withStyles(styles, { name: 'FolderListView' })(FolderListView);
