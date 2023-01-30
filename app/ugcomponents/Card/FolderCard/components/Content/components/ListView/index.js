import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ItemListView from 'ugcomponents/ItemListView';
import styles from './styles';

export const TemplateEntryListView = ({ viewDelegate, classes, noULWrap }) => (
  <ItemListView
    noULWrap={noULWrap}
    className={classes.listViewRoot}
    viewDelegate={viewDelegate}
  />
);

TemplateEntryListView.propTypes = {
  classes: PropTypes.object,
  viewDelegate: PropTypes.object.isRequired,
  noULWrap: PropTypes.bool,
};

TemplateEntryListView.defaultProps = {
  classes: {},
  noULWrap: false,
};

export default withStyles(styles)(TemplateEntryListView);
