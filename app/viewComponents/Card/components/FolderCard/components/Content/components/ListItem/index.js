import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';
import Icon from 'viewComponents/Icon';

import styles from './styles';

export class FolderListItem extends PureComponent {
  render = () => {
    const { classes, type, content, index, url } = this.props;

    return (
      <ListItem
        key={index}
        disableGutters
        divider
        classes={{ default: classes.listItemRoot }}
      >
        <Icon
          icon={type === 'folder' ? 'lnr-folder' : 'lnr-document'}
          className={classnames(classes.listItemIcon, 'itemIcon')}
        />
        <Link to={url} className={classes.listItemLink} title={content}> {/*eslint-disable-line*/}
          {content}
        </Link>
      </ListItem>
    );
  };
}

FolderListItem.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default withStyles(styles, { name: 'FolderListItem' })(FolderListItem);
