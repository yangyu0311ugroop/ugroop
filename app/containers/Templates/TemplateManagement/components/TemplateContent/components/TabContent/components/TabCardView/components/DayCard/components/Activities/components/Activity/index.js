import FlexContainer from 'components/GridContainer';
import FlexItem from 'components/GridItem';
import H4 from 'components/H4';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import classNames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString } from 'utils/stringAdditions';
import Image from 'containers/Templates/TemplateManagement/components/Image';

import Attachment from './components/Attachment';
import { CONFIG } from './config';
import styles from './styles';

export class Activity extends PureComponent {
  render = () => {
    const {
      classes,
      attachmentId,
      content,
      location,
      photoId,
      lastItem,
      isLazyLoad,
    } = this.props;
    const attachmentIcon = isEmptyString(attachmentId) ? (
      ''
    ) : (
      <FlexItem>
        <Attachment attachmentId={attachmentId} size="small" />
      </FlexItem>
    );
    const photoSection = isEmptyString(photoId) ? (
      ''
    ) : (
      <FlexItem>
        <Image
          imgClassName={classes.img}
          photoId={photoId}
          isLazyLoad={isLazyLoad}
        />
      </FlexItem>
    );
    const locationSection = isEmptyString(location) ? (
      ''
    ) : (
      <p
        className={classNames(classes.activityLocation, {
          [classes.activityLocationMarginBottom]: !lastItem,
        })}
      >
        {location}
      </p>
    );
    return (
      <FlexContainer
        spacing={0}
        className={classNames(classes.activityItem, {
          [classes.activityItemLastItem]: lastItem,
        })}
        alignItems="center"
      >
        <FlexItem className={classes.grow}>
          <FlexContainer spacing={0} alignItems="center">
            <FlexItem>
              {LOGIC_HELPERS.ifElse(
                content,
                <H4 className={classes.activityTitle}>{content}</H4>,
                '',
              )}
            </FlexItem>
            {attachmentIcon}
          </FlexContainer>
          {locationSection}
        </FlexItem>
        {photoSection}
      </FlexContainer>
    );
  };
}

Activity.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  lastItem: PropTypes.bool,

  // resaga props
  content: PropTypes.string,
  location: PropTypes.string,
  photoId: PropTypes.string,
  attachmentId: PropTypes.any,
  isLazyLoad: PropTypes.bool,
};

Activity.defaultProps = {
  content: '',
  location: '',
  photoId: '',
  attachmentId: '',
  lastItem: false,
  isLazyLoad: true,
};

export default compose(
  withStyles(styles, { name: 'Activity' }),
  resaga(CONFIG),
)(Activity);
