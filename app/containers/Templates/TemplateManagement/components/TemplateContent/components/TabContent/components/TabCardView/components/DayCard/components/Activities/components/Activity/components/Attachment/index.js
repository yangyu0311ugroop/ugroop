import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Icon from 'ugcomponents/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { padFacadeURL } from 'utils/helpers/request';

import { CONFIG } from './config';
import styles from './styles';

export class Attachment extends PureComponent {
  render = () => {
    const { classes, url, name, size, description } = this.props;
    const fileUrl = padFacadeURL(url);
    return (
      <Tooltip
        title={description || name}
        placement="bottom-end"
        classes={{ popper: classes.popper }}
      >
        <a href={fileUrl} className={classes.link} target="_blank">
          <Icon icon="paperclip" size={size} className={classes.icon} />
        </a>
      </Tooltip>
    );
  };
}

Attachment.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props

  // resaga props
  url: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  size: PropTypes.string,
};

Attachment.defaultProps = {
  url: '',
  name: '',
  description: '',
  size: 'medium',
};

export default compose(
  withStyles(styles, { name: 'Attachment' }),
  resaga(CONFIG),
)(Attachment);
