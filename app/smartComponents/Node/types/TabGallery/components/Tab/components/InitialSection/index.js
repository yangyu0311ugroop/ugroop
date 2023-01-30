import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import UploadPhotos from 'smartComponents/Node/components/UploadPhotos';
import Icon from 'ugcomponents/Icon/index';
import { ACTIVITY, PHOTO } from 'utils/modelConstants';
import { CONFIG } from './config';
import styles from './styles';

export class GalleryInitial extends PureComponent {
  getRole = () =>
    ability.can('create', {
      type: ACTIVITY,
      createdBy: this.props.createdBy,
    }) ||
    ability.can('create', { type: PHOTO, createdBy: this.props.createdBy });

  renderLoading = () => {
    const { classes } = this.props;
    return (
      <GridItem>
        <div className={classes.subtitle}>
          <Icon icon="lnr-sync" /> Loading...
        </div>
      </GridItem>
    );
  };

  renderEmpty = () => {
    const myRole = this.getRole();
    const { classes } = this.props;
    const noImageHolder = 'There are no images here';
    const descriptionPlaceHolder =
      'Upload more images along with a description';
    return (
      <GridItem>
        <GridContainer direction="column" alignItems="center" spacing={1}>
          <GridItem>
            <Icon icon="lnr-picture2" size="xl" color="gray" />
          </GridItem>
          <GridItem className={classes.title}>{noImageHolder}</GridItem>
          {myRole && (
            <GridItem className={classes.subtitle}>
              {descriptionPlaceHolder}
            </GridItem>
          )}
          {myRole && (
            <GridItem>
              <UploadPhotos blankslate />
            </GridItem>
          )}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes, fetching } = this.props;
    return (
      <GridContainer className={classes.root} card>
        <GridContainer direction="column" alignItems="center" spacing={1}>
          {fetching ? this.renderLoading() : this.renderEmpty()}
        </GridContainer>
      </GridContainer>
    );
  };
}

GalleryInitial.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  fetching: PropTypes.bool,
  createdBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

GalleryInitial.defaultProps = {
  fetching: false,
  createdBy: 0,
};

export default compose(
  withStyles(styles, { name: 'GalleryInitial' }),
  resaga(CONFIG),
)(GalleryInitial);
