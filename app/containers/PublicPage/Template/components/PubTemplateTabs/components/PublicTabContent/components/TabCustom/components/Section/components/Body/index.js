import { EMPTY_RTE } from 'appConstants';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import classnames from 'classnames';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Image from 'ugcomponents/ImagePlaceholder/index';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import Attachment from './components/Attachment';
import { UPLOAD_PHOTO_SIZE } from './constant';
import { CONFIG } from './config';
import styles from './styles';

export class Body extends PureComponent {
  renderDescription = () => {
    const { id, description, content: photo, classes } = this.props;
    const hasPhoto = !!photo;

    if (!description || description === EMPTY_RTE) return '';

    const content = (
      <RichTextEditor
        readOnly
        initContent={description}
        toolBarId={`readonly${id}`}
      />
    );

    return (
      <GridItem className={classnames({ [classes.paddingRight]: hasPhoto })}>
        {content}
      </GridItem>
    );
  };

  renderPhoto = () => {
    const { classes, content: photo, x, y, width, height } = this.props;

    if (!photo) return '';

    const content = (
      <Image
        className={classes.imgPreview}
        imgSrc={photo}
        alt={photo}
        facadeURLPrefix
        cropMetaInfo={{
          x,
          y,
          width,
          height,
        }}
        resizeSize={UPLOAD_PHOTO_SIZE}
      />
    );
    return <GridItem className={classes.imgPosition}>{content}</GridItem>;
  };

  renderAttachment = () => {
    const { id, attachmentId, content: photo } = this.props;
    const hasPhoto = !!photo;
    return (
      <Attachment
        readonly
        sectionId={id}
        id={attachmentId}
        hasPhoto={hasPhoto}
      />
    );
  };

  renderBody = () => {
    const { classes, content, attachmentExist } = this.props;

    const description = this.renderDescription();
    const attachment = this.renderAttachment();

    if (!description && !attachmentExist && !content) return '';

    return (
      <GridItem
        className={classnames(classes.grow, { [classes.minHeight]: content })}
      >
        <GridContainer direction="column">
          {description}
          {attachment}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes } = this.props;
    const body = this.renderBody();
    const photo = this.renderPhoto();

    if (!body && !photo) return <span />;

    return (
      <GridItem>
        <GridContainer className={classes.root}>
          {body}
          {photo}
        </GridContainer>
      </GridItem>
    );
  };
}

Body.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // section id

  // resaga props
  description: PropTypes.string,

  // meta info x, y, width, height
  attachmentId: PropTypes.string,
  attachmentExist: PropTypes.bool,
  content: PropTypes.string, // photo.content
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

Body.defaultProps = {
  description: '',
  attachmentId: '',
  attachmentExist: false,
  content: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export default compose(
  withStyles(styles, { name: 'Body' }),
  resaga(CONFIG),
)(Body);
