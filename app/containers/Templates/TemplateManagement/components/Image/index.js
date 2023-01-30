import Image from 'ugcomponents/Picture/UGImage';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { padFacadeURL } from 'utils/helpers/request';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';
import styles from './styles';

export class TemplateManagementImage extends PureComponent {
  render = () => {
    const { classes, isLazyLoad, metaInfo, onError } = this.props;
    const url = padFacadeURL(this.props.content);

    return (
      <Image
        imgClassName={classnames(classes.image, this.props.imgClassName)}
        className={classnames(classes.root, this.props.rootClassName)}
        imageUrl={url}
        cropMetaInfo={LOGIC_HELPERS.ifElse(metaInfo, metaInfo, {})}
        rotate={metaInfo && metaInfo.rotate}
        isLazyLoad={isLazyLoad}
        onError={onError}
      />
    );
  };
}

TemplateManagementImage.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  imgClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  onError: PropTypes.func,

  // resaga props
  content: PropTypes.string,
  metaInfo: PropTypes.object,
  isLazyLoad: PropTypes.bool,
};

TemplateManagementImage.defaultProps = {
  metaInfo: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotate: 0,
    scale: 0,
  },
  content: '',

  imgClassName: '',
  rootClassName: '',
  isLazyLoad: true,
};

export default compose(
  withStyles(styles, { name: 'TemplateManagementImage' }),
  resaga(CONFIG),
)(TemplateManagementImage);
