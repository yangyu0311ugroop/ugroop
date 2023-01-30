import { ability } from 'apis/components/Ability/ability';
import {
  AVATAR,
  CREATED_BY,
  GRID_VIEW,
  PREVIEW,
  SELECT,
  TEXT,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { ReactionSummary } from 'smartComponents/Node/components/Reactions';
import CreatedAt from 'smartComponents/Node/parts/CreatedAt';
import CreatedBy from 'smartComponents/Node/parts/CreatedBy';
import Description from 'smartComponents/Node/parts/Description';
import Photo from 'smartComponents/Node/parts/Photo';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ACTIVITY, PHOTO } from 'utils/modelConstants';
import Button from 'viewComponents/Button';

import { CONFIG } from './config';
import styles from './styles';

export class PhotoCard extends PureComponent {
  componentWillMount = () => {
    const { classes, id, onClick, createdBy } = this.props;

    this.classNames = {
      updateButtonClassName: classes.updateButton,
    };
    this.placeholderProps = {
      replaceButton: 'Change photo',
      showDelete: false,
      onClick: onClick(id),
    };
    this.activity = { type: ACTIVITY, createdBy };
    this.photo = { type: PHOTO, createdBy };
  };

  showInfo = () => true;

  canUpdate = () =>
    ability.can('update', this.activity) || ability.can('update', this.photo);

  photoEditable = () => {
    const { editable, clickMode } = this.props;

    return clickMode === PREVIEW && editable && this.canUpdate();
  };

  renderHeader = () => {
    const { classes, id, isPublic } = this.props;

    return (
      this.showInfo() &&
      !isPublic && (
        <GridItem>
          <GridContainer
            alignItems="center"
            wrap="nowrap"
            className={classnames(classes.padding, classes.first)}
          >
            <GridItem>
              <CreatedBy id={id} variant={AVATAR} />
            </GridItem>
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <JText bold dark>
                    <CreatedBy id={id} variant={TEXT} />
                  </JText>
                </GridItem>

                <GridItem className={classes.offsetTop}>
                  <JText sm gray ellipsis2>
                    <CreatedAt id={id} />
                  </JText>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderPhoto = () => {
    const { id, editable, clickMode, layout } = this.props;

    const size = LOGIC_HELPERS.ifElse(layout === GRID_VIEW, 600, 1200);

    return (
      <GridItem>
        <Photo
          key={layout}
          id={id}
          editable={this.photoEditable()}
          fullWidth={layout === GRID_VIEW}
          resizeSize={size}
          size={size}
          showPreview={false}
          showDownload={clickMode === PREVIEW && !editable}
          placeholderProps={this.placeholderProps}
          classNames={this.classNames}
        />
      </GridItem>
    );
  };

  renderDescription = ({ content }) => <GridItem>{content}</GridItem>;

  renderContent = () => {
    const { classes, id, isPublic } = this.props;

    return (
      this.showInfo() &&
      !isPublic && (
        <GridItem>
          <GridContainer
            alignItems="center"
            className={classes.paddingAll}
            spacing={0}
          >
            <GridItem>
              <ReactionSummary id={id} showEmpty />
            </GridItem>
          </GridContainer>
        </GridItem>
      )
    );
  };

  renderCheckButton = () => {
    const { classes, selected, editable, clickMode } = this.props;

    return (
      clickMode === SELECT &&
      editable && (
        <div
          className={classnames(
            classes.checkBadge,
            LOGIC_HELPERS.ifElse(
              selected,
              classes.checkBadgeSelected,
              classes.checkBadgeHover,
            ),
          )}
        >
          <Icon icon="lnr-check" bold size="small" />
        </div>
      )
    );
  };

  renderDeleteButton = () => {
    const { classes, id, groupBy, onDelete } = this.props;

    return (
      this.photoEditable() && (
        <Button
          size="xs"
          className={classnames(
            classes.deleteButton,
            LOGIC_HELPERS.ifElse(
              groupBy === CREATED_BY,
              classes.deleteButtonNoAuthor,
            ),
          )}
          buttonTitle="Delete photo"
          onClick={onDelete(id)}
        >
          <Icon icon="lnr-trash2" size="small" />
        </Button>
      )
    );
  };

  render = () => {
    const { classes, id, editable, selected, children, isPublic } = this.props;

    const content = (
      <div
        className={classnames(
          classes.photoGrid,
          classes.photoGridHover,
          LOGIC_HELPERS.ifElse([editable, selected], classes.fade),
        )}
      >
        <GridContainer direction="column" spacing={0}>
          {this.renderHeader()}

          <JText dark>
            <Description
              id={id}
              component={GridItem}
              advancedMode={false}
              editable={this.photoEditable()}
              className={classes.padding}
              isMinHeightCollapse
              renderSeeMore={!isPublic}
              isCollapeSeeMore={!isPublic}
            >
              {this.renderDescription}
            </Description>
          </JText>

          {this.renderPhoto()}

          {this.renderContent()}
        </GridContainer>

        {this.renderCheckButton()}
        {this.renderDeleteButton()}
      </div>
    );

    if (typeof children === 'function') {
      return children({ canUpdate: this.canUpdate(), content });
    }

    return content;
  };
}

PhotoCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number, // activity id
  createdBy: PropTypes.number,
  selected: PropTypes.bool,
  clickMode: PropTypes.string,
  layout: PropTypes.string,
  groupBy: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  children: PropTypes.func,
  isPublic: PropTypes.bool,

  // resaga props
  editable: PropTypes.bool,
};

PhotoCard.defaultProps = {
  isPublic: false,
};

export default compose(
  withStyles(styles, { name: 'PhotoCard' }),
  resaga(CONFIG),
)(PhotoCard);
