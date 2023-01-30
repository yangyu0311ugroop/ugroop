import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import {
  postMetaInfo,
  queryImageURL,
  horizontalSide,
} from 'utils/helpers/request';
import { isEmptyString } from 'utils/stringAdditions';
import TemplateImage from './templateImage';
import { CONFIG } from './config';

const templateQueryImage = 1000;
export class TemplateImageContainer extends PureComponent {
  static propTypes = {
    templatePhotoUrl: PropTypes.string,
    photoId: PropTypes.string,
    photoMetaInfo: PropTypes.object,
  };

  static defaultProps = {
    templatePhotoUrl: '',
  };

  render = () => {
    const { templatePhotoUrl, photoId, photoMetaInfo } = this.props;
    let photo = '';
    if (!isEmptyString(templatePhotoUrl)) {
      const meta = postMetaInfo({
        x: photoMetaInfo.x,
        y: photoMetaInfo.y,
        width: photoMetaInfo.width,
        height: photoMetaInfo.height,
      });
      const side = horizontalSide(photoMetaInfo.rotate);

      photo = queryImageURL(
        photoId,
        true,
        templateQueryImage,
        meta,
        side,
        photoMetaInfo.rotate,
      );
    }
    return <TemplateImage imgSrc={photo} />;
  };
}

export default resaga(TemplateImageContainer, CONFIG);
