import { ability } from 'apis/components/Ability/ability';
import { TITLE } from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { Hidden, withStyles } from 'components/material-ui';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import PropTypes from 'prop-types';
/**
 * Created by Yang on 28/9/2017.
 */
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';

import Content from 'smartComponents/Node/parts/Content';
import Description from 'smartComponents/Node/parts/Description';
import Photo from 'smartComponents/Node/parts/Photo';
import Location from 'ugcomponents/Inputs/Location';
import ValidationTextField from 'ugcomponents/Inputs/ValidationTextField/index';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DAY } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import DayTitleLocationContent from './dayTitleLocationContent';
import { CONFIG, PHOTO_ID_CONFIG } from './defines/contentConfig';
import { dayContentStyles } from './style';

export class DayContent extends PureComponent {
  onTextChange = value => {
    this.props.onTitleChange(value);
  };

  onUrlChange = value => {
    this.props.onUrlChange(value);
  };

  onRichContentTextChange = value => {
    this.props.onRichContentTextChange(value);
  };

  handleChange = key => value => {
    const { dayId } = this.props;

    this.props.resaga.setValue({
      editDays: sections.upsert({ id: dayId }, { node: { [key]: value } }),
    });
  };

  toggleEdit = e => {
    e.preventDefault();
    this.props.toolBarFunc.toggleEdit();
  };

  editing = () => {
    const { editing, editable } = this.props;

    return editing || editable;
  };

  canEdit = () => Boolean(this.editing() && ability.can('update', DAY));

  openDayView = () => {
    const { dayId } = this.props;

    this.props.resaga.setValue({
      selectedId: dayId,
      layout: DAY,
    });
  };

  viewMode() {
    const {
      classes,
      dayId,
      content,
      location,
      layout,
      description,
      url,
    } = this.props;

    const clickable = !this.editing() && layout !== DAY;

    const title = (
      <Content
        viewingClassName={LOGIC_HELPERS.ifElse(
          clickable,
          classes.clickableTitle,
        )}
        id={dayId}
        variant={TITLE}
        editable={this.canEdit()}
        viewComponentProps={LOGIC_HELPERS.ifElse(clickable, {
          onClick: this.openDayView,
          title: 'See this day detail',
        })}
      />
    );

    const hasAnything = content || location || url || description;

    return (
      (this.editing() || hasAnything) && (
        <DayTitleLocationContent
          dayId={dayId}
          title={title}
          content={content}
          editable={this.canEdit()}
        />
      )
    );
  }

  editMode() {
    const {
      content,
      url,
      classes,
      description,
      dayId,
      placeId,
      location,
      timeZoneId,
      toolBarFunc,
    } = this.props;

    const body = (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <div className={classes.editModeInput}>
            <ValidationTextField
              name="content"
              type="text"
              label="Title for this day"
              value={content}
              autoFocus
              wrapperClassName={classes.dayContentTitle}
              className={classes.inputText}
              onChange={this.onTextChange}
              required
            />
          </div>
        </GridItem>
        <GridItem>
          <div className={classes.editModeInput}>
            <Location
              editing
              locationKey="location"
              location={location}
              placeId={placeId}
              timeZoneId={timeZoneId}
              handleChange={this.handleChange}
            />
          </div>
        </GridItem>
        <GridItem>
          <div className={classes.editModeInput}>
            <ValidationTextField
              name="url"
              type="text"
              label="URL"
              value={url}
              wrapperClassName={classes.dayContentTitle}
              className={classes.inputText}
              onChange={this.onUrlChange}
            />
          </div>
        </GridItem>
        <GridItem>
          <div className={classnames(classes.description, classes.paddingTop)}>
            <RichTextEditor
              initContent={description}
              onChange={this.onRichContentTextChange}
              toolBarId={`dayToolBar${dayId}`}
            />
          </div>
        </GridItem>
        <GridItem>
          <div className={classes.buttons}>
            <GridContainer alignItems="center" justify="flex-end">
              <GridItem>
                <Button size="xs" color="gray" onClick={toolBarFunc.toggleEdit}>
                  Cancel
                </Button>
              </GridItem>
              <GridItem>
                <Button size="xs" color="primary" type="submit">
                  Save
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    );

    return (
      <Fragment>
        <Hidden mdUp>
          <GridItem className={classes.offsetLeft}>
            <GridContainer direction="column">
              <GridItem>{body}</GridItem>
            </GridContainer>
          </GridItem>
        </Hidden>
        <Hidden smDown>
          <GridItem>
            <GridContainer className={classes.editModeGrid}>
              <GridItem className={classes.grow}>{body}</GridItem>
            </GridContainer>
          </GridItem>
        </Hidden>
      </Fragment>
    );
  }

  render = () => {
    const { classes, dayId, isPublic } = this.props;

    let content;
    if (!this.props.editor) {
      content = this.viewMode();
    } else {
      content = this.editMode();
    }

    return (
      <GridItem className={classes.dayContentWdith}>
        <GridContainer direction="column">
          <GridItem>
            <GridContainer
              alignItems="center"
              className={classes.root}
              spacing={2}
            >
              <Photo
                id={dayId}
                component={GridItem}
                size={72}
                editable={this.canEdit()}
              />
              <GridItem className={classes.grow}>{content}</GridItem>
            </GridContainer>
          </GridItem>

          <Description
            id={dayId}
            editable={this.canEdit()}
            renderSeeMore={!isPublic}
            isCollapeSeeMore={!isPublic}
            isMinHeightCollapse
          />
        </GridContainer>
      </GridItem>
    );
  };
}

DayContent.propTypes = {
  dayId: PropTypes.number.isRequired,
  editor: PropTypes.bool,
  onTitleChange: PropTypes.func,
  onUrlChange: PropTypes.func,
  onRichContentTextChange: PropTypes.func,
  classes: PropTypes.object,
  resaga: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  index: PropTypes.number.isRequired,
  editable: PropTypes.bool,
  editing: PropTypes.bool,
  // resaga
  content: PropTypes.string,
  url: PropTypes.string,
  location: PropTypes.string,
  placeId: PropTypes.string,
  timeZoneId: PropTypes.string,
  layout: PropTypes.string,

  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  toolBarFunc: PropTypes.object,
  isPublic: PropTypes.bool,
};

DayContent.defaultProps = {
  editor: false,
  content: '',
  url: '',
  location: '',
  placeId: '',
  timeZoneId: '',

  description: '',
  toolBarFunc: {},
  isPublic: false,
};

export default compose(
  withStyles(dayContentStyles, { name: 'DayContent' }),
  resaga(CONFIG),
  resaga(PHOTO_ID_CONFIG),
)(DayContent);
