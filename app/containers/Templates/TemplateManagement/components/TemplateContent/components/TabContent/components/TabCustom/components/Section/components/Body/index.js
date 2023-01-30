import { withStyles } from '@material-ui/core/styles';
import { ability } from 'apis/components/Ability/ability';
import { EMPTY_RTE, LINK } from 'appConstants';
import classnames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import ValidationTextField from 'ugcomponents/Inputs/ValidationTextField/index';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { PRINT_TOUR_HELPER } from 'containers/PrintPage/Components/PrintTour/utils';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Url from 'smartComponents/Node/parts/URL';
import Description from 'smartComponents/Node/parts/Description';
import Location from 'smartComponents/Node/parts/Location';
import EditingLocation from 'ugcomponents/Inputs/Location';
import RichTextEditor from 'ugcomponents/RichTextEditor';
import { ACTIVITY } from 'utils/modelConstants';
import Attachment from './components/Attachment';
import { CONFIG } from './config';
import styles from './styles';
import JText from '../../../../../../../../../../../../../components/JText';

export class Body extends PureComponent {
  componentWillMount = () => {
    const { classes } = this.props;
    this.dialogClasses = { paper: classes.paper };
  };

  canUpdate = () =>
    this.props.editable &&
    ability.can('update', { type: ACTIVITY, createdBy: this.props.createdBy });

  handleChange = key => value => {
    const { id } = this.props;
    this.props.resaga.setValue({
      editSections: sections.upsert({ id }, { node: { [key]: value } }),
    });
  };

  renderDescription = () => {
    const {
      id,
      batchEditing,
      isPrint,
      classes,
      editable,
      isPublic,
    } = this.props;
    let content = '';
    const { description } = this.props;
    const descr = isPrint
      ? PRINT_TOUR_HELPER.handleVideo(description)
      : description;

    if (!batchEditing) {
      if (!editable && (!descr || descr === EMPTY_RTE)) {
        return null;
      }
      content = isPrint ? (
        <RichTextEditor
          readOnly
          initContent={descr}
          toolBarId={`readonly${id}`}
          wrapperClassname={classes.video}
        />
      ) : (
        <Description
          id={id}
          editable={this.canUpdate()}
          renderSeeMore={!isPublic}
          isCollapeSeeMore={!isPublic}
          noContent={
            <JText ellipsis>Start typing or paste the section body here</JText>
          }
          placeholder="Start typing or paste the section body here"
        />
      );
    } else {
      content = (
        <RichTextEditor
          initContent={description}
          onChange={this.handleChange('description')}
          toolBarId={`rte${id}`}
        />
      );
    }

    return <GridItem>{content}</GridItem>;
  };

  renderAttachment = () => {
    const {
      id,
      title,
      attachmentId,
      editing,
      editable,
      attachmentExist,
      description,
      location,
    } = this.props;

    if (!attachmentExist && !editable && !editing) return null;

    const showHr = Boolean(title || description || location);

    return (
      <Attachment
        showHr={showHr}
        readonly={!editing}
        sectionId={id}
        id={attachmentId}
        canUpdate={this.canUpdate()}
        showEmpty={this.canUpdate()}
        placeholder="Add a helpful attachment"
      />
    );
  };

  renderLocation = () => {
    const {
      id,
      batchEditing,
      location,
      icon,
      placeId,
      timeZoneId,
      classes,
    } = this.props;

    if (batchEditing) {
      return (
        <GridItem className={classes.locationContainer}>
          <EditingLocation
            editing
            location={location}
            icon={icon}
            placeId={placeId}
            timeZoneId={timeZoneId}
            handleChange={this.handleChange}
          />
        </GridItem>
      );
    }

    return (
      <GridItem>
        <Location
          id={id}
          editable={this.canUpdate()}
          noContent={
            <JText ellipsis>Add a location if needed for this section</JText>
          }
          placeholder="Add a location if needed for this section"
        />
      </GridItem>
    );
  };

  renderUrl = () => {
    const { id, classes, batchEditing, onDataChange, url } = this.props;
    if (batchEditing) {
      return (
        <GridItem className={classes.urlContainer}>
          <ValidationTextField
            name="url"
            type="text"
            label="URL"
            value={url}
            wrapperClassName={classes.dayContentTitle}
            className={classes.inputText}
            onChange={onDataChange('url')}
          />
        </GridItem>
      );
    }

    return (
      <Url
        variant={LINK}
        id={id}
        editable={this.canUpdate()}
        viewingClassName={LOGIC_HELPERS.ifElse(
          !this.canUpdate(),
          classes.urlStyles,
        )}
        noContent="Add a URL if relevant"
        placeholder="Add a URL if relevant"
      />
    );
  };

  renderBody = () => {
    const {
      classes,
      content,
      attachmentExist,
      editing,
      location,
      url,
    } = this.props;

    const description = this.renderDescription();
    const attachment = this.renderAttachment();

    if (
      !editing &&
      !description &&
      !attachmentExist &&
      !content &&
      !location &&
      !url
    )
      return null;

    return (
      <GridItem className={classnames(classes.grow, classes.maxWidth)}>
        <GridContainer
          direction="column"
          spacing={editing ? 8 : 0}
          wrap="nowrap"
          className={classes.noWrap}
        >
          {this.renderLocation()}
          {this.renderUrl()}
          {description}
          {attachment}
        </GridContainer>
      </GridItem>
    );
  };

  render = () => {
    const { classes } = this.props;

    const body = this.renderBody();

    if (!body) return null;

    return (
      <GridItem>
        <GridContainer className={classes.root}>{body}</GridContainer>
      </GridItem>
    );
  };
}

Body.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // section id
  isPrint: PropTypes.bool,
  onDataChange: PropTypes.func,

  // resaga props
  editing: PropTypes.number,
  title: PropTypes.string, // section content
  description: PropTypes.string,
  location: PropTypes.string,
  icon: PropTypes.string,
  placeId: PropTypes.string,
  timeZoneId: PropTypes.string,
  editable: PropTypes.bool,
  batchEditing: PropTypes.bool,
  url: PropTypes.string,

  // meta info x, y, width, height
  attachmentId: PropTypes.number,
  attachmentExist: PropTypes.bool,
  content: PropTypes.string, // photo.content
  createdBy: PropTypes.number,
  isPublic: PropTypes.bool,

  // edit mode
};

Body.defaultProps = {
  editing: 0,
  description: '',

  attachmentId: 0,
  attachmentExist: false,
  content: '',
  createdBy: 0,
  isPublic: false,
};

export default compose(
  withStyles(styles, { name: 'Body' }),
  resaga(CONFIG),
)(Body);
