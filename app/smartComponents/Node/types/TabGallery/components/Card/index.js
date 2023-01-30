import { ability } from 'apis/components/Ability/ability';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import UGLink from 'components/Link';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  ONLY_ME,
  ORGANISERS,
} from 'smartComponents/Node/types/TabOther/components/TabAccess/constants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import UploadPhotos from 'smartComponents/Node/components/UploadPhotos';
import FilterIdsByTourDate from 'smartComponents/Node/logics/FilterIdsByTourDate';
import Photo from 'smartComponents/Node/parts/Photo';
import { RECENTLY_UPLOADED, URL_HELPERS, AVATAR } from 'appConstants';
import { ACTIVITY, PHOTO } from 'utils/modelConstants';
import { IMAGE_SIZES_CONSTANTS } from 'smartComponents/File/types/Photo/constants';
import CreatedBy from 'smartComponents/Node/parts/CreatedBy';
import { withRouter } from 'react-router-dom';
import { CONFIG } from './config';
import styles from './styles';

export const MAX_PHOTOS = 15;

export class Card extends PureComponent {
  state = {
    showingCount: 0,
  };

  componentDidUpdate = prevProps => {
    const { selectDayId, filtered } = this.props;
    const { showingCount } = this.state;
    if (selectDayId !== prevProps.selectDayId && filtered && showingCount > 0) {
      this.setState({ showingCount: 0 });
    }
  };

  canCreatePhoto = () =>
    ability.can('create', ACTIVITY) || ability.can('create', PHOTO);

  openPreview = previewId => () => {
    const { id, isPublic } = this.props;

    return PORTAL_HELPERS.openPhotoPreview(
      {
        id,
        previewId,
        sortBy: RECENTLY_UPLOADED,
        isPublic,
      },
      this.props,
    );
  };

  renderPhoto = id => {
    const { classes, isPublic } = this.props;

    return (
      <GridItem key={id} className={classes.photoFrame}>
        {!isPublic && (
          <span className={classes.avatar}>
            <CreatedBy
              id={id}
              variant={AVATAR}
              imageSize={IMAGE_SIZES_CONSTANTS.XXXS}
              className={classes.avatar}
            />
          </span>
        )}
        <Photo
          id={id}
          size={48}
          resizeSize={100}
          editable={false}
          borderRadius={false}
          showPreview={false}
          placeholderProps={{
            onClick: this.openPreview(id),
          }}
        />
      </GridItem>
    );
  };

  renderEmpty = () => {
    const { classes } = this.props;

    return (
      <GridItem className={classes.noPhoto}>
        Share your photos and images about the tour along with a description
      </GridItem>
    );
  };

  getPublicPrint = () => {
    const { history } = this.props;
    const { pathname } = history.location;

    const index = 17;
    const baseURL = '/public/template';
    const prefixURL = `${baseURL}/`;
    return `${prefixURL}${pathname.slice(index)}`;
  };

  renderGoTo = (max = MAX_PHOTOS) => {
    const { templateId, children, filtered, index, isPublic } = this.props;
    const { showingCount } = this.state;
    let url = `${URL_HELPERS.tours(templateId)}?tab=${index}`;
    if (isPublic) {
      url = `${this.getPublicPrint()}?tab=${index}`;
    }
    if (children.length <= max && !filtered) return null;

    if (filtered && showingCount >= children.length && showingCount < max)
      return null;

    return (
      <GridItem>
        <UGLink to={url} title="Go to Gallery">
          See all ({children.length})
        </UGLink>
      </GridItem>
    );
  };

  renderPhotoCount = () => {
    const { children, filtered, classes } = this.props;
    const { showingCount } = this.state;

    if (!filtered || children.length === 0) return null;
    const hiddenCount = children.length - showingCount;
    // const textShow = LOGIC_HELPERS.ifElse(
    //   showingCount > 0,
    //   `${hiddenCount} of ${children.length}`,
    //   'All',
    // );
    //
    // const textShowing = LOGIC_HELPERS.ifElse(
    //   showingCount > 0,
    //   `only showing ${showingCount}`,
    //   'will only show',
    // );
    if (!hiddenCount) return null;
    return (
      <GridItem>
        <GridContainer spacing={0} className={classes.photoCount}>
          <GridItem className={classes.photoCountText}>
            {showingCount === 0
              ? 'There is nothing'
              : `Showing ${showingCount}`}{' '}
            uploaded on this day
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderPhotos = ({ filteredIds }) => {
    const { classes, children, filtered } = this.props;

    const photoIds = filteredIds || children;
    this.setState({ showingCount: photoIds.length });

    if (!children.length) {
      return this.renderEmpty();
    }

    if (!photoIds.length) return null;

    return (
      <GridItem>
        <GridContainer
          alignItems="center"
          spacing={0}
          className={classes.photoGrid}
        >
          {photoIds
            .slice() // copy
            .reverse() // show newest first
            .slice(
              0,
              LOGIC_HELPERS.ifElse(!filtered, MAX_PHOTOS, photoIds.length),
            ) // only show max photos if not filtered
            .map(this.renderPhoto)}
        </GridContainer>
      </GridItem>
    );
  };

  filteredIds = ids => (
    <FilterIdsByTourDate ids={ids}>{this.renderPhotos}</FilterIdsByTourDate>
  );

  renderFooter = () => (
    <GridItem>
      <GridContainer direction="column" spacing={0}>
        {this.renderPhotoCount()}
        {this.renderGoTo()}
      </GridContainer>
    </GridItem>
  );

  render = () => {
    const {
      component: Component,
      templateId,
      classes,
      children,
      filtered,
      index,
      content,
      sharedWith,
    } = this.props;

    if (sharedWith === ORGANISERS || sharedWith === ONLY_ME) {
      return null;
    }

    return (
      <Component>
        <GridContainer
          card
          direction="column"
          wrap="nowrap"
          className={classnames(classes.root, classes.paddingLeft)}
        >
          <GridItem>
            <GridContainer alignItems="center">
              {this.canCreatePhoto() && (
                <GridItem>
                  <UploadPhotos buttonClassName={classes.smallText} />
                </GridItem>
              )}
              <GridItem xs>
                <UGLink
                  to={`${URL_HELPERS.tours(templateId)}?tab=${index}`}
                  title={`Go to ${content} tab`}
                >
                  <div className={classes.header}>{content}</div>
                </UGLink>
              </GridItem>
            </GridContainer>
          </GridItem>
          {filtered ? this.filteredIds(children) : this.renderPhotos({})}
          {this.renderFooter()}
        </GridContainer>
      </Component>
    );
  };
}

Card.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // tab id
  templateId: PropTypes.number,
  filtered: PropTypes.bool,
  component: PropTypes.any,
  // status: PropTypes.string,
  content: PropTypes.string,
  sharedWith: PropTypes.string,
  isPublic: PropTypes.bool,

  // resaga props
  children: PropTypes.array,
  selectDayId: PropTypes.number,
  index: PropTypes.number,
};

Card.defaultProps = {
  component: 'span',
  children: [],
  filtered: false,
  isPublic: false,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'Card' }),
  resaga(CONFIG),
)(Card);
