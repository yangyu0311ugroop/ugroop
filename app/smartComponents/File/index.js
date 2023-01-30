import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import omit from 'lodash/omit';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { Photo } from './types';
import { CONFIG } from './config';
import styles from './styles';
import { FILE_TYPES } from './constants';

export class File extends PureComponent {
  stripOwnProps = () => omit(this.props, ['resaga', 'classes', 'type']);

  renderDefault = () => <Photo {...this.stripOwnProps()} />;

  render = () => {
    const { type } = this.props;

    return LOGIC_HELPERS.switchCase(type, {
      [DEFAULT]: this.renderDefault,
    });
  };
}

File.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  type: PropTypes.string,

  // resaga props
};

File.defaultProps = {
  type: FILE_TYPES.PHOTO,
};

export default compose(
  withStyles(styles, { name: 'File' }),
  resaga(CONFIG),
)(File);
