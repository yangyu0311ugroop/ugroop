import { withStyles } from '@material-ui/core/styles';
import { DEFAULT } from 'appConstants';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import omit from 'lodash/omit';
import { CANVAS_SIZE_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import { isEmptyString } from 'utils/stringAdditions';

import PhotoField from 'smartComponents/Inputs/Photo';
import PhotoInline from 'smartComponents/File';

import { CONFIG, FILE_CONFIG } from './config';
import styles from './styles';

export class Photo extends PureComponent {
  getPhotoObject = {
    url: this.props.photo,
    x: this.props.x,
    y: this.props.y,
    scale: this.props.scale,
    height: this.props.height,
    width: this.props.width,
    rotate: this.props.rotate,
  };

  getFieldPhoto = () =>
    !isEmptyString(this.props.photo) ? this.getPhotoObject : this.props.photo;

  stripOwnProps = () =>
    omit(this.props, [
      'classes',
      'resaga',
      'id',
      'isFormsyConnected',
      'onUpload',
      'onDelete',
    ]);

  stripOwnPropsNotFormsyConnected = () =>
    omit(this.props, ['classes', 'resaga', 'id', 'isFormsyConnected']);

  render = () => {
    const fieldPhoto = this.getFieldPhoto();
    const placeholderProps = {
      showIconOnHover: !this.props.isFormsyConnected,
      deleteIcon: true,
      ...this.props.placeholderProps,
    };

    return this.props.isFormsyConnected ? (
      <PhotoField
        name={USER_PASSPORTS_FIELDS.photo}
        {...this.stripOwnProps()}
        value={fieldPhoto}
        canvasSize={CANVAS_SIZE_CONSTANTS.LANDSCAPE_MD}
        placeholderProps={placeholderProps}
      />
    ) : (
      <PhotoInline
        {...this.stripOwnPropsNotFormsyConnected()}
        canvasSize={CANVAS_SIZE_CONSTANTS.LANDSCAPE_MD}
        placeholderProps={placeholderProps}
      />
    );
  };
}

Photo.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  isFormsyConnected: PropTypes.bool,
  placeholderProps: PropTypes.object,

  // resaga props
  photo: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
  scale: PropTypes.number,
};

Photo.defaultProps = {
  photo: null,
  variant: DEFAULT,
  isFormsyConnected: false,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rotate: 0,
  scale: 0,
  placeholderProps: {},
};

export default compose(
  withStyles(styles, { name: 'Photo' }),
  resaga(CONFIG),
  resaga(FILE_CONFIG),
)(Photo);
