import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import TemplateView from 'containers/Templates/Components/TemplateView';

import { withRouter } from 'react-router-dom';

import styles from './styles';
import { CONFIG } from './config';

export function Body({ folderId, currentRoute }) {
  return (
    <React.Fragment>
      <TemplateView folderId={folderId} currentRoute={currentRoute} />
    </React.Fragment>
  );
}

Body.propTypes = {
  // hoc props
  // parent props
  folderId: PropTypes.number.isRequired,
  currentRoute: PropTypes.string,

  // resaga props
};

Body.defaultProps = {};

export default compose(
  withRouter,
  withStyles(styles, { name: 'Body' }),
  resaga(CONFIG),
)(Body);
