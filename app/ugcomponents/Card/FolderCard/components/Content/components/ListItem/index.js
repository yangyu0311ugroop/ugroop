import React from 'react';
import PropTypes from 'prop-types';
import UGLink from 'components/Link';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ListItem } from '@material-ui/core';
import Icon from 'ugcomponents/Icon';
import styles from './styles';

export const TemplateEntryListItem = ({
  classes,
  type,
  content,
  index,
  url,
}) => (
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
    <UGLink to={url} className={classes.listItemLink} title={content}>
      {content}
    </UGLink>
  </ListItem>
);

TemplateEntryListItem.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

TemplateEntryListItem.defaultProps = {
  classes: {},
};

export default withStyles(styles)(TemplateEntryListItem);
