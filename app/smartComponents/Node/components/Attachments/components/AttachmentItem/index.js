import PropTypes from 'prop-types';
import { LINK } from 'appConstants';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Attachment from 'viewComponents/Attachment';
import resaga from 'resaga';
import { withStyles } from '@material-ui/core/styles';
import { SIZE_CONSTANTS } from 'sizeConstants';
import classnames from 'classnames';
import { CONFIG } from './config';
import styles from './styles';

export class AttachmentItem extends PureComponent {
  render = () => {
    const { link, name, classes, compact, description } = this.props;
    return (
      <div
        className={classnames(
          classes.item,
          compact && classes.maxWidthItem,
          !compact && classes.maxWidthList,
        )}
      >
        <Attachment
          variant={LINK}
          link={link}
          name={name}
          description={description}
          compact
          iconSize={SIZE_CONSTANTS.XXXS}
        />
      </div>
    );
  };
}

AttachmentItem.propTypes = {
  // hoc props
  classes: PropTypes.object,
  // parent
  link: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  compact: PropTypes.bool,
};

AttachmentItem.defaultProps = {
  link: '',
  name: '',
};

export default compose(
  withStyles(styles, { name: 'AttachmentItem' }),
  resaga(CONFIG),
)(AttachmentItem);
