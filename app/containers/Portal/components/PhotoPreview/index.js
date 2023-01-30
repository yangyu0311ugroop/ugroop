import { Hidden } from '@material-ui/core';
import { ability } from 'apis/components/Ability/ability';
import { BATCH_DELETE_CHILDREN, NODE_API } from 'apis/constants';
import { AVATAR, CONTENT, RECENTLY_UPLOADED, VIEW_MODE } from 'appConstants';
import classnames from 'classnames';
import Dialog from 'components/Dialog';
import UGDialogAction from 'components/Dialog/UGDialogAction';
import UGDialogContent from 'components/Dialog/UGDialogContent';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';

import {
  ReactButton,
  ReactionSummary,
} from 'smartComponents/Node/components/Reactions';
import ReactionCount from 'smartComponents/Node/logics/ReactionCount';
import Hr from 'components/Hr';

import NodeProp from 'smartComponents/Node/components/NodeProp';
import CreatedAt from 'smartComponents/Node/parts/CreatedAt';
import CreatedBy from 'smartComponents/Node/parts/CreatedBy';
import Description from 'smartComponents/Node/parts/Description';
import Photo from 'smartComponents/Node/parts/Photo';
import { InlineButton } from 'ugcomponents/Buttons';
import Icon from 'ugcomponents/Icon';
import { ACTIVITY, PHOTO } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { CONFIG } from './config';
import styles from './styles';

export class PhotoPreview extends PureComponent {
  state = {
    editing: false,
    confirmDeleteDialogId: 0,
  };

  componentWillMount = () => {
    const { classes, createdBy } = this.props;

    this.placeholderProps = {
      replaceButton: 'Change photo',
      showDelete: false,
      showOverlay: false,
    };
    this.classNames = {
      updateButtonClassName: classes.updateButton,
      downloadButtonClassName: classes.downloadButton,
    };
    this.classNamesSm = {
      updateButtonClassName: classes.updateButtonSm,
      downloadButtonClassName: classes.downloadButton,
    };
    this.activity = { type: ACTIVITY, createdBy };
    this.photo = { type: PHOTO, createdBy };
  };

  componentDidMount = () => {
    const { exist } = this.props;

    if (!exist) {
      return this.closePreview();
    }

    return document.addEventListener('keydown', this.handleKeyDown, false);
  };

  componentWillReceiveProps = nextProps => {
    const { createdBy } = this.props;
    const { exist } = nextProps;

    if (!exist) {
      this.closePreview();
    }

    if (createdBy !== nextProps.createdBy) {
      this.activity = { type: ACTIVITY, createdBy: nextProps.createdBy };
      this.photo = { type: PHOTO, createdBy: nextProps.createdBy };
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  };

  canEditPhoto = () =>
    ability.can('update', this.activity) || ability.can('update', this.photo);

  deletePhoto = () => {
    const { id, previewId } = this.props;

    this.props.resaga.dispatchTo(NODE_API, BATCH_DELETE_CHILDREN, {
      payload: {
        items: [previewId],
        keyPath: `${id}.children`,
      },
      onSuccess: this.deletePhotoSuccess,
      onError: this.deletePhotoError,
    });
  };

  deletePhotoSuccess = () => {
    const { confirmDeleteDialogId } = this.state;

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);

    // go to the next one after delete if possible
    const children = this.children();

    if (children.length < 2) {
      this.closePreview();
    } else {
      this.previewRight();
    }
  };

  deletePhotoError = () => {
    const { confirmDeleteDialogId } = this.state;

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);
  };

  confirmDelete = () => {
    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDeletePhoto(
      {
        onConfirm: this.deletePhoto,
        count: 1,
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  handleKeyDown = event => {
    const { previewId } = this.props;
    const { editing } = this.state;

    if (!editing && previewId) {
      if (event.keyCode === 37) {
        this.previewLeft();
      }
      if (event.keyCode === 39) {
        this.previewRight();
      }
    }
  };

  closePreview = () => PORTAL_HELPERS.close(this.props);

  previewLeft = () => {
    const { portalId, id, previewId, sortBy } = this.props;
    const children = this.children();

    if (!previewId) return null;

    const index = children.indexOf(previewId);

    let nextPreviewId;

    if (index === 0) nextPreviewId = children[children.length - 1];
    else nextPreviewId = children[index - 1];

    return PORTAL_HELPERS.openPhotoPreview(
      { id, previewId: nextPreviewId, sortBy },
      this.props,
      portalId,
    );
  };

  previewRight = () => {
    const { id, portalId, previewId, sortBy } = this.props;
    const children = this.children();

    if (!previewId) return null;

    const index = children.indexOf(previewId);

    let nextPreviewId;

    if (index === children.length - 1) nextPreviewId = children[0];
    else nextPreviewId = children[index + 1];

    return PORTAL_HELPERS.openPhotoPreview(
      { id, previewId: nextPreviewId, sortBy },
      this.props,
      portalId,
    );
  };

  handleDescriptionMode = mode => {
    this.setState({ editing: mode !== VIEW_MODE });
  };

  children = () => {
    const { children, sortBy } = this.props;

    return sortBy === RECENTLY_UPLOADED ? children.slice().reverse() : children;
  };

  renderPhoto = () => {
    const { classes, id, previewId } = this.props;

    const children = this.children();

    const index = children.indexOf(previewId) + 1;
    const showNavigation = children.length > 1;

    return (
      <GridContainer direction="column" spacing={0}>
        {showNavigation && (
          <GridItem
            onClick={this.previewLeft}
            className={classes.navigationLeft}
          >
            <div className={classes.relative}>
              <div
                className={classnames(
                  classes.navigationButton,
                  classes.navigationButtonHover,
                  classes.navigationButtonLeft,
                )}
              >
                <Icon icon="lnr-chevron-left" bold />
              </div>
            </div>
          </GridItem>
        )}
        {showNavigation && (
          <GridItem
            onClick={this.previewRight}
            className={classes.navigationRight}
          >
            <div className={classes.relative}>
              <div
                className={classnames(
                  classes.navigationButton,
                  classes.navigationButtonHover,
                  classes.navigationButtonRight,
                )}
              >
                <Icon icon="lnr-chevron-right" bold />
              </div>
            </div>
          </GridItem>
        )}
        <div className={classes.photoHeader}>
          <GridContainer direction="column" spacing={0}>
            <GridItem>
              <div className={classes.title}>
                <NodeProp
                  id={id}
                  valueKey={CONTENT}
                  editable={false}
                  isCustomData={false}
                />
              </div>
            </GridItem>
            <GridItem>
              <div className={classes.subtitle}>
                {index} of {children.length}
              </div>
            </GridItem>
          </GridContainer>
        </div>
        {this.canEditPhoto() && (
          <Hidden smDown>
            <Button
              size="xs"
              color="white"
              buttonTitle="Delete Image"
              className={classnames(classes.deleteButton)}
              onClick={this.confirmDelete}
            >
              <Icon icon="lnr-trash2" size="small" />
            </Button>
          </Hidden>
        )}
        <GridItem className={classes.textCenter}>
          <Hidden smDown>
            <Photo
              id={previewId}
              key={previewId}
              editable
              size={500}
              resizeSize={2000}
              borderRadius={false}
              hideFrame
              placeholderProps={this.placeholderProps}
              showPreview={false}
              showDownload
              classNames={this.classNames}
              customCanEdit={this.canEditPhoto()}
            />
          </Hidden>
          <Hidden mdUp>
            <Photo
              id={previewId}
              key={previewId}
              editable
              size={500}
              resizeSize={2000}
              borderRadius={false}
              hideFrame
              placeholderProps={this.placeholderProps}
              showPreview={false}
              showDownload
              classNames={this.classNamesSm}
              customCanEdit={this.canEditPhoto()}
            />
          </Hidden>
        </GridItem>
      </GridContainer>
    );
  };

  renderReactButton = id => (_, hasReacted, nodeId) => (
    <ReactButton id={nodeId} parentNodeId={id} hasReacted={hasReacted} />
  );

  renderReactionSection = () => {
    const { previewId } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer>
            <GridItem>
              <ReactionSummary id={previewId} />
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem>
          <Hr noMarginTop halfMarginBottom />
          <ReactionCount id={previewId}>
            {this.renderReactButton(previewId)}
          </ReactionCount>
          <Hr noMarginBottom halfMarginTop />
        </GridItem>
      </GridContainer>
    );
  };

  renderContent = () => {
    const { classes, previewId, isPublic, smDown } = this.props;

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer alignItems="center">
            {!isPublic && (
              <GridItem>
                <CreatedBy id={previewId} variant={AVATAR} />
              </GridItem>
            )}
            {!isPublic && (
              <GridItem className={classes.grow}>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <CreatedBy id={previewId} />
                  </GridItem>
                  <GridItem className={classes.createdAt}>
                    <CreatedAt id={previewId} />
                  </GridItem>
                </GridContainer>
              </GridItem>
            )}
            {this.canEditPhoto() && (
              <Hidden mdUp>
                <GridItem>
                  <Button
                    size="xs"
                    color="normal"
                    buttonTitle="More"
                    className={classes.deleteButtonSmall}
                    onClick={this.confirmDelete}
                  >
                    <Icon icon="lnr-trash2" size="small" />
                  </Button>
                </GridItem>
              </Hidden>
            )}
          </GridContainer>
        </GridItem>
        <GridItem>
          <Description
            id={previewId}
            editable={this.canEditPhoto()}
            onModeChange={this.handleDescriptionMode}
            renderSeeMore={false}
            wrapperClassName={LOGIC_HELPERS.ifElse(smDown, classes.maxHeight)}
          />
        </GridItem>
        {!isPublic && <GridItem>{this.renderReactionSection()}</GridItem>}
      </GridContainer>
    );
  };

  render = () => {
    const { classes } = this.props;

    const photo = this.renderPhoto();
    const content = this.renderContent();

    return (
      <>
        <Hidden smDown>
          <Dialog
            maxWidth={false}
            disabled={false}
            open
            onClose={this.closePreview}
          >
            <div className={classes.closeButton}>
              <InlineButton color="default" onClick={this.closePreview}>
                <Icon icon="lnr-cross2" />
              </InlineButton>
            </div>
            <GridContainer spacing={0}>
              <GridItem>
                <div
                  className={classnames(
                    classes.previewImg,
                    classes.previewImgLarge,
                  )}
                >
                  {photo}
                </div>
              </GridItem>
              <GridItem>
                <div className={classes.right}>{content}</div>
              </GridItem>
            </GridContainer>
          </Dialog>
        </Hidden>
        <Hidden mdUp>
          <Dialog
            maxWidth="md"
            fullWidth
            disabled={false}
            open
            onClose={this.closePreview}
          >
            <div className={classes.closeButton}>
              <InlineButton color="default" onClick={this.closePreview}>
                <Icon icon="lnr-cross2" />
              </InlineButton>
            </div>
            <UGDialogContent className={classnames(classes.dialogContent)}>
              <div
                className={classnames(
                  classes.previewImg,
                  classes.previewImgSmall,
                )}
              >
                {photo}
              </div>
            </UGDialogContent>
            <UGDialogAction className={classes.dialogActionSmall}>
              <div className={classes.rightSmall}>{content}</div>
            </UGDialogAction>
          </Dialog>
        </Hidden>
      </>
    );
  };
}

PhotoPreview.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  portalId: PropTypes.number,
  id: PropTypes.number, // tab id
  exist: PropTypes.number, // tab id
  previewId: PropTypes.number,
  createdBy: PropTypes.number,
  // onClose: PropTypes.func,
  sortBy: PropTypes.string,
  isPublic: PropTypes.bool,

  // resaga props
  children: PropTypes.array,
};

PhotoPreview.defaultProps = {
  sortBy: RECENTLY_UPLOADED,
  children: [],
  isPublic: false,
};

export default compose(
  withStyles(styles, { name: 'PhotoPreview' }),
  withSMDown,
  resaga(CONFIG),
)(PhotoPreview);
