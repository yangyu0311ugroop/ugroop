import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import TemplateView from './components/TemplateView';

import LayoutControl from './components/LayoutControl';
import { CONFIG } from './config';
import styles from './styles';

export const Body = () => (
  <div>
    <LayoutControl />
    <TemplateView />
  </div>
);

Body.propTypes = {
  // hoc props
  // parent props
  // resaga props
};

Body.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Body' }),
  resaga(CONFIG),
)(Body);
