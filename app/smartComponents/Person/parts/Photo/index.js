import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { last } from 'lodash';
import resaga from 'resaga';
import { PERSON_DETAIL_API, PATCH_PERSON_FACADE } from 'apis/constants';
import File from 'smartComponents/File';
import { FILE_TYPES } from 'smartComponents/File/constants';
import { IMAGE_VARIANTS_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import LetterAvatar from 'ugcomponents/LetterAvatar';
import { VARIANTS } from 'variantsConstants';

import { CONFIG } from './config';

export class Photo extends PureComponent {
  getStrippedOwnProps = () =>
    omit(this.props, ['resaga', 'photo', 'id', 'classes']);

  personPhoto = () => {
    const { photo } = this.props;

    if (Array.isArray(photo)) {
      return last(photo);
    }

    return photo;
  };

  handleUpload = (photo, metaInfo) => {
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PERSON_FACADE, {
      payload: {
        data: {
          photo: {
            url: photo,
            ...metaInfo,
          },
        },
        userId: this.props.id,
      },
    });
  };

  handleDelete = () => {
    this.props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PERSON_FACADE, {
      payload: {
        data: {
          photo: null,
        },
        userId: this.props.id,
        oldPhoto: this.personPhoto(),
      },
    });
  };

  render = () => {
    const { editable, knownAs, letterAvatarClassName } = this.props;

    const photo = this.personPhoto();

    if (!photo && !editable) {
      return <LetterAvatar name={knownAs} className={letterAvatarClassName} />;
    }

    return (
      <File
        type={FILE_TYPES.PHOTO}
        id={photo}
        onDelete={this.handleDelete}
        onUpload={this.handleUpload}
        {...this.getStrippedOwnProps()}
      />
    );
  };
}

Photo.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  variant: PropTypes.string,
  shape: PropTypes.string,
  deleteTitle: PropTypes.string,
  editable: PropTypes.bool,
  letterAvatarClassName: PropTypes.string,

  // resaga props
  knownAs: PropTypes.string,
  photo: PropTypes.any,
};

Photo.defaultProps = {
  variant: VARIANTS.EDITABLE,
  shape: IMAGE_VARIANTS_CONSTANTS.ROUND,
  deleteTitle: 'Delete Profile Photo',
};

export default compose(resaga(CONFIG))(Photo);
