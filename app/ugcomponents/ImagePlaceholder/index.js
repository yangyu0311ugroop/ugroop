/* eslint-disable jsx-a11y/click-events-have-key-events */
// TODO: remove this line, once we update the eslint to 5
/**
 * Created by edil on 8/4/17.
 */
/**
 * Modified by Yang on 1/11/17.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { queryImageURL, postMetaInfo } from 'utils/helpers/request';
import { isEmptyString } from 'utils/stringAdditions';
import { withStyles } from '@material-ui/core/styles';
import Icon from 'ugcomponents/Icon';
import Dialog from 'ugcomponents/Dialog';
import styles from './style';

// TODO : JSS IN CSS & Modernizer check.
export class UGImagePlaceholder extends PureComponent {
  state = {
    open: false,
  };

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.close();
    this.props.onDeleteClick();
  };

  deleteDialog = () => (
    <Dialog
      type="image"
      template="delete"
      open={this.state.open}
      headlineIcon="lnr-picture3"
      headlineTitle={this.props.deleteTitle}
      cancelFunc={this.close}
      confirmFunc={this.handleDelete}
    />
  );

  generateIcons = () => {
    let iconDelete;
    let size = 'medium';
    let color = 'white';
    const {
      classes,
      fileId,
      largeIcons,
      smallIcons,
      centerIcons,
      deleteIcon,
      onMoveClick,
      showIconOnHover,
      showUploadIcon,
      showMoveIcon,
    } = this.props;

    if (smallIcons) {
      size = 'small';
    }

    if (largeIcons) {
      color = 'dark';
      size = 'extraMedium';
    }

    const isMedium = LOGIC_HELPERS.ifElse(size === 'medium', true, false);

    const iconMove = (
      <Icon
        size={size}
        color={color}
        icon="lnr-move"
        className={classnames({
          [classes.iconLarge]: largeIcons,
          [classes.iconCircle]: centerIcons || smallIcons,
          [classes.iconMove]: !largeIcons && !centerIcons && !smallIcons,
          [classes.iconHidden]: showIconOnHover,
          [classes.mediumIcon]: isMedium,
        })}
      />
    );
    const iconCamera = (
      <Icon
        size={size}
        color={color}
        icon="lnr-camera2"
        className={classnames({
          [classes.iconLarge]: largeIcons,
          [classes.iconCircle]: centerIcons || smallIcons,
          [classes.iconCamera]: !largeIcons && !centerIcons && !smallIcons,
          [classes.iconHidden]: showIconOnHover,
          [classes.mediumIcon]: isMedium,
        })}
      />
    );

    if (deleteIcon) {
      iconDelete = (
        <span tabIndex="-2" role="button" onClick={this.open}>
          <Icon
            size={size}
            color="white"
            icon="lnr-trash2"
            className={classnames({
              [classes.iconLarge]: largeIcons,
              [classes.iconCircle]: smallIcons,
              [classes.iconDelete]: !centerIcons && !largeIcons && !smallIcons,
              [classes.iconHidden]: showIconOnHover,
              [classes.mediumIcon]: isMedium,
            })}
          />
        </span>
      );
    }

    const camera = LOGIC_HELPERS.ifElse(
      showUploadIcon,
      <label
        htmlFor={fileId}
        className={classnames({
          [classes.imgLabel]: !largeIcons,
          [classes.iconCameraPositionLarge]: largeIcons,
        })}
      >
        {iconCamera}
      </label>,
      null,
    );

    const move = LOGIC_HELPERS.ifElse(
      showMoveIcon,
      <span
        role="button"
        tabIndex="-1"
        onClick={onMoveClick}
        className={classnames({
          [classes.iconMovePositionLarge]: largeIcons,
        })}
      >
        {iconMove}
      </span>,
      null,
    );

    return (
      <div className={classnames({ [classes.centerIcons]: !largeIcons })}>
        {camera}
        {move}
        {iconDelete}
      </div>
    );
  };

  render() {
    const {
      imgSrc,
      placeholder,
      onLoaded,
      facadeURLPrefix,
      fileId,
      largeIcons,
      classes,
      className,
      style,
      resizeSize,
      rotate,
      cropMetaInfo,
      resizeSide,
      showIconOnHover,
    } = this.props;

    if (!isEmptyString(imgSrc)) {
      let imagePlaceholder;
      const cropMeta = postMetaInfo(cropMetaInfo);
      const newImageSrc = queryImageURL(
        imgSrc,
        facadeURLPrefix,
        resizeSize,
        cropMeta,
        resizeSide,
        rotate,
      );
      if (!isEmptyString(fileId)) {
        imagePlaceholder = (
          <div
            className={classnames({
              [classes.imgContainer]: !largeIcons,
              [classes.imgContainerLarge]: largeIcons,
              [classes.hover]: showIconOnHover,
            })}
          >
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src={newImageSrc}
              alt="Loading..."
              onLoad={onLoaded}
              style={style}
              className={classnames(classes.roundImg, {
                [className]: !largeIcons,
              })}
            />
            {this.generateIcons()}
          </div>
        );
      } else {
        imagePlaceholder = (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <img
            src={newImageSrc}
            alt="placeholder"
            data-testid={newImageSrc}
            onLoad={onLoaded}
            style={style}
            className={classnames(classes.roundImg, className)}
          />
        );
      }
      return (
        <div>
          {this.deleteDialog()}
          {imagePlaceholder}
        </div>
      );
    }
    return <div className={classes.center}>{placeholder}</div>;
  }
}

UGImagePlaceholder.propTypes = {
  imgSrc: PropTypes.any,
  fileId: PropTypes.string,
  placeholder: PropTypes.any,
  onLoaded: PropTypes.func,
  onMoveClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  deleteTitle: PropTypes.string,
  facadeURLPrefix: PropTypes.bool,
  style: PropTypes.object,
  deleteIcon: PropTypes.bool,
  largeIcons: PropTypes.bool,
  smallIcons: PropTypes.bool,
  centerIcons: PropTypes.bool,
  showUploadIcon: PropTypes.bool,
  showMoveIcon: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  resizeSize: PropTypes.number,
  rotate: PropTypes.number,
  cropMetaInfo: PropTypes.object,
  resizeSide: PropTypes.oneOf(['width', 'height']),
  showIconOnHover: PropTypes.bool,
};

UGImagePlaceholder.defaultProps = {
  fileId: '',
  className: '',
  facadeURLPrefix: false,
  placeholder: '',
  cropMetaInfo: {},
  resizeSide: 'width',
  rotate: 0,
  deleteIcon: false,
  largeIcons: false,
  smallIcons: false,
  showIconOnHover: false,
  deleteTitle: 'DELETE IMAGE',
  showUploadIcon: true,
  showMoveIcon: true,
};

export default withStyles(styles, { name: 'UGImagePlaceholder' })(
  UGImagePlaceholder,
);
