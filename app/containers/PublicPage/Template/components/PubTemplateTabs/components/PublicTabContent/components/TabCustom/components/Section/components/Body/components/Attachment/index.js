import React, { PureComponent } from 'react';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import GridItem from 'components/GridItem/index';
import GridContainer from 'components/GridContainer/index';
import Icon from 'ugcomponents/Icon';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { formatBytes } from 'utils/filesizeUtils';
import { padFacadeURL } from 'utils/helpers/request';
import { CONFIG } from './config';
import styles from './styles';

export class Attachment extends PureComponent {
  renderFileName = () => {
    const { classes, name, attachmentURL, fileSize } = this.props;

    if (fileSize) {
      return (
        <Tooltip placement="top" title="Click to Download">
          <div>
            <a
              className={classes.fileName}
              href={padFacadeURL(attachmentURL)}
              target="_blank"
            >
              {name}
            </a>
          </div>
        </Tooltip>
      );
    }
    return <div className={classes.filePending}>File Pending</div>;
  };

  renderContent = () => {
    const { classes, fileSize, description, hasPhoto } = this.props;

    if (!fileSize && !description) {
      if (!hasPhoto) {
        return <span />;
      }
      return <div className={classes.paddingBottom} />;
    }

    return (
      <div>
        <hr
          className={classnames(classes.hr, { [classes.marginTop]: hasPhoto })}
        />
        <GridContainer>
          <GridItem>
            <Icon icon="lnr-paperclip" color="lavender" />
          </GridItem>
          <GridItem className={classes.file}>{this.renderFileName()}</GridItem>
          {fileSize > 0 && (
            <GridItem className={classes.fileSize}>
              {formatBytes(fileSize)}
            </GridItem>
          )}
          {description && (
            <GridItem className={classes.separator} hidden={{ smDown: true }}>
              |
            </GridItem>
          )}
          <GridItem className={classes.grow}>
            <div className={classes.fileDescription}>{description}</div>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  render = () => {
    const { classes } = this.props;
    return (
      <GridItem>
        <GridContainer direction="column" className={classes.root}>
          <GridItem>{this.renderContent()}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

Attachment.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  hasPhoto: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.number.isRequired, // attachment id

  // resaga props
  attachmentURL: PropTypes.string, // attachment url
  name: PropTypes.string,
  fileSize: PropTypes.number,
  description: PropTypes.string,
};

Attachment.defaultProps = {
  name: '',
  attachmentURL: '',
  fileSize: 0,
  description: '',
};

export default compose(
  withStyles(styles, { name: 'Attachment' }),
  resaga(CONFIG),
)(Attachment);
