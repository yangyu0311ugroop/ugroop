import React, { Fragment, PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import { pastTenseAction } from 'utils/pastTense';
import { compose } from 'redux';
import classnames from 'classnames';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { CONFIG } from './config';
import styles from './styles';

export class Actions extends PureComponent {
  renderDefault = () => {
    const { action, actionObjType, classes } = this.props;
    const name = `${NODE_STORE_HELPERS.translateType(actionObjType)}  named`;
    return (
      <Fragment>
        <span className={classnames(classes.capitalize, classes.spanMargin)}>
          {pastTenseAction(action)}
        </span>
        <span>{name}</span>
      </Fragment>
    );
  };

  render = () => this.renderDefault();
}

Actions.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  // resaga props
  action: PropTypes.string,
  actionObjType: PropTypes.string,
};

Actions.defaultProps = {
  action: '',
  actionObjType: '',
};

export default compose(
  withStyles(styles, { name: 'Actions' }),
  resaga(CONFIG),
)(Actions);
