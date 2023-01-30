import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ORGANISATION_API, PATCH_ORG } from 'apis/constants';
import File from 'smartComponents/File';
import LetterAvatar from 'ugcomponents/LetterAvatar';
import { FILE_TYPES } from 'smartComponents/File/constants';
import { CONFIG } from './config';

export class Photo extends PureComponent {
  getStrippedOwnProps = () =>
    omit(this.props, [
      'resaga',
      'name',
      'letterAvatar',
      'photo',
      'id',
      'classes',
    ]);

  handleUpload = (photo, metaInfo) => {
    this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id: this.props.id,
        data: {
          photo: {
            url: photo,
            ...metaInfo,
          },
        },
      },
    });
  };

  handleDelete = () => {
    const data = {
      photo: {
        url: null,
        x: null,
        y: null,
        width: null,
        height: null,
        scale: null,
        rotate: null,
      },
    };
    this.props.resaga.dispatchTo(ORGANISATION_API, PATCH_ORG, {
      payload: {
        id: this.props.id,
        data,
      },
    });
  };

  render = () => {
    const { photo, name, letterAvatar, avatarProps, editable } = this.props;

    if (letterAvatar && !photo) {
      return <LetterAvatar name={name} {...avatarProps} />;
    }

    return (
      <File
        type={FILE_TYPES.PHOTO}
        id={photo}
        onDelete={this.handleDelete}
        onUpload={this.handleUpload}
        editable={editable}
        {...this.getStrippedOwnProps()}
      />
    );
  };
}

Photo.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  editable: PropTypes.bool,
  avatarProps: PropTypes.object,
  letterAvatar: PropTypes.bool,
  name: PropTypes.string,

  // resaga props
  photo: PropTypes.string,
};

Photo.defaultProps = {
  name: '',
  photo: '',
  editable: false,
  avatarProps: {},
};

export default compose(resaga(CONFIG))(Photo);
