/**
 * Created by quando on 6/7/17.
 */
import { withStyles } from '@material-ui/core/styles';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import {
  CREATE_PHOTO,
  DELETE_CHILDREN,
  NODE_API,
  UPDATE_PHOTO,
} from 'apis/constants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import DayHeader from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/components/TimeLineContent/components/RenderDay/components/Day/components/dayHeader';
import { DEFAULT_SELECTDAY_INDEX } from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/components/TabTimeLine/config';
import { UPDATE_NODE } from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabContent/config';
import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import { SHOW_ERROR_IN_SNACKBAR } from 'error-messages';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Scroll, { scroller } from 'react-scroll';
import { compose } from 'redux';
import resaga from 'resaga';
import Heading from 'smartComponents/Node/parts/Heading';
import { scrollOptions, templateDayIdAnchor } from 'utils/constant';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import DayContainer from './components/dayContainer';
import { CONFIG } from './defines/config';
import style from './style';

export class Day extends PureComponent {
  state = {
    editMode: this.props.isNew || false,
  };

  componentWillMount() {
    this.title = this.props.content;
    this.description = this.props.description;
    this.url = this.props.url;

    this.toolBarFunc = {
      toggleEdit: this.toggleEdit,
      delete: this.handleDelete,
      update: this.handleUpdate,
    };
  }

  componentDidMount = () => {
    const { dayId, discussionDrawerNodeId, editable } = this.props;
    const { editMode } = this.state;

    if (discussionDrawerNodeId === dayId) {
      this.onScroll(discussionDrawerNodeId);
    }

    if (!editable && editMode) {
      this.toggleEdit();
    }
  };

  componentWillReceiveProps = nextProps => {
    const { editable, selected } = this.props;
    const { editMode } = this.state;

    if (nextProps.willBeEdited !== this.props.willBeEdited) {
      this.setState({
        editMode: nextProps.willBeEdited,
      });
    }
    if (
      nextProps.discussionDrawerNodeId !== this.props.discussionDrawerNodeId
    ) {
      this.onScroll(nextProps.discussionDrawerNodeId);
    }

    // exiting Edit mode
    if (editable && editMode && !nextProps.editable) {
      this.toggleEdit();
    }

    // stop inline editing if the day is not selected
    if (selected && !nextProps.selected && nextProps.editing) {
      this.props.resaga.setValue({ editing: false });
    }

    // show border when start selecting
    if (!selected && nextProps.selected) {
      this.setState({ showBorder: true }, () => {
        this.hideBorder = setTimeout(this.handleHideBorder, 7000);
      });
    }
  };

  componentWillUnmount = () => {
    clearTimeout(this.hideBorder);
  };

  handleHideBorder = () => this.setState({ showBorder: false });

  onScroll = dayId =>
    scroller.scrollTo(templateDayIdAnchor(dayId), scrollOptions);

  /*
   UI Actions
  * */
  onTitleChange = value => {
    this.title = value;
  };

  onUrlChange = value => {
    this.url = value;
  };

  onRichContentChange = value => {
    this.templateDescription = value;
  };

  onClickDay = () => {
    const { selected, dayId } = this.props;
    if (!selected) {
      this.dispatchSelectRow(dayId);
    }
  };

  updateTimes = () => {
    const { dayId } = this.props;
    NODE_API_HELPERS.getTreeAndTimes({ id: dayId }, this.props);
  };

  /*
   * Request Callback
   */
  dayUpdateSuccess = () => {
    if (!this.photo) {
      const prev = this.state.editMode;
      this.setState({
        editMode: !prev,
      });
    }
    this.removeEditing();
    this.props.resaga.setValue({ editDayId: DEFAULT_SELECTDAY_INDEX });
    this.updateTimes();
  };

  imageUpdateSuccess = () => {
    const prev = this.state.editMode;
    this.setState({
      editMode: !prev,
    });
  };

  handleDelete = () => {
    const { dayId, tabId } = this.props;

    this.props.resaga.dispatchTo(NODE_API, DELETE_CHILDREN, {
      payload: {
        nodeId: dayId,
        keyPath: `${tabId}.children`,
      },
      onSuccess: this.deleteSuccess,
      onError: SHOW_ERROR_IN_SNACKBAR(this.props.resaga),
    });
  };

  handleDayUpdateError = () => {
    const prev = this.state.editMode;
    this.setState({
      editMode: !prev,
    });
  };

  dispatchDayUpdate(node) {
    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: {
        node,
        nodeId: this.props.dayId,
      },
      onSuccess: this.dayUpdateSuccess,
      onError: this.handleDayUpdateError,
    });
  }

  dispatchImageUpdate(payload, action) {
    this.props.resaga.dispatchTo(NODE_API, action, {
      payload,
      onSuccess: this.imageUpdateSuccess,
    });
  }

  handleUpdate = ({ location }) => {
    const {
      dayId,
      dayPhotoId,
      icon,
      placeId,
      timeZoneId,
      fk,
      oldMetaInfo,
    } = this.props;
    let description;
    if (this.templateDescription) {
      description = this.templateDescription;
    } else {
      description = this.description; // Immutable JObj
    }

    let locationExtra = {};
    if (placeId !== null) {
      locationExtra = { icon, placeId, timeZoneId };
    }

    const data = {
      id: dayId,
      content: this.title,
      customData: { description, location, url: this.url, ...locationExtra },
      type: 'day',
    };

    this.dispatchDayUpdate(data);
    const otherData = { location, description, locationExtra };
    if (this.photo) {
      if (fk && fk !== -1) {
        this.dispatchImageUpdate(
          {
            id: dayId,
            fk,
            content: this.photo.url,
            metaInfo: this.photo.metaInfo,
            oldMetaInfo,
            fileName: this.photo.fileName,
            oldPhoto: dayPhotoId,
            otherData,
          },
          UPDATE_PHOTO,
        );
      } else {
        this.dispatchImageUpdate(
          {
            id: dayId,
            content: this.photo.url,
            metaInfo: this.photo.metaInfo,
            fileName: this.photo.fileName,
            otherData,
          },
          CREATE_PHOTO,
        );
      }
    }
  };

  toggleEdit = () => {
    const { hasContent, hasSections, isNew } = this.props;
    if (this.state.editMode) {
      this.removeEditing();
      if (!hasContent && !hasSections && isNew) {
        this.handleDelete();
        return;
      }
    }
    const prev = this.state.editMode;
    this.setState({
      editMode: !prev,
    });
    this.props.resaga.setValue({
      editDayId: DEFAULT_SELECTDAY_INDEX,
    });
  };

  dispatchSelectRow = dayId => {
    this.props.resaga.setValue({
      selectDayId: dayId,
    });
  };

  removeEditing = () => {
    const { dayId } = this.props;
    this.props.resaga.setValue({
      editDays: sections.remove(dayId),
    });
  };

  renderDay = () => {
    const {
      index,
      id,
      hasContent,
      dayId,
      children,
      classes,
      dayPhotoId,
      hasSections,
      addNewSectionRequested,
      templateId,
      showEventDetail,
      selected,
      isPublic,
      checklists,
      editing,
      editable,
    } = this.props;
    const { showBorder } = this.state;

    let section = '';
    if (addNewSectionRequested || (hasContent && hasSections)) {
      section = (
        <GridItem className={classnames(classes.sections, classes.paddingZero)}>
          {children}
        </GridItem>
      );
    }

    return (
      <GridContainer
        card
        elevation={2}
        spacing={0}
        direction="column"
        className={classnames(
          LOGIC_HELPERS.ifElse([selected, showBorder], classes.highlightBorder),
        )}
      >
        <GridItem
          className={classnames(
            classes.day,
            classes.normalWidth,
            classes.paddingZero,
          )}
        >
          <Scroll.Element name={id}>
            <DayContainer
              showEventDetail={showEventDetail}
              templateId={templateId}
              dayIndex={index}
              toolBarFunc={this.toolBarFunc}
              editorMode={this.state.editMode || this.props.willBeEdited}
              dayId={dayId}
              dayPhotoId={dayPhotoId}
              onTitleChange={this.onTitleChange}
              onUrlChange={this.onUrlChange}
              onRichContentTextChange={this.onRichContentChange}
              checklistLength={checklists.length}
              isPublic={isPublic}
              editing={editing || editable}
            />
          </Scroll.Element>
        </GridItem>
        {section}
      </GridContainer>
    );
  };

  renderHeading = () => {
    const { index, dayId, editable } = this.props;

    return (
      <Heading
        id={dayId}
        editing={editable}
        component={GridItem}
        first={index === 0}
        typeLabelHeader="Day"
      />
    );
  };

  render = () => {
    const {
      index,
      dayId,
      classes,
      hasSections,
      tabId,
      marginLeft,
      editing,
    } = this.props;

    const refId = templateDayIdAnchor(dayId);
    return (
      <Scroll.Element name={refId} className={classes.relative}>
        <div
          id={`day${dayId}`}
          className={classnames(
            LOGIC_HELPERS.ifElse(marginLeft, classes.marginLeft),
          )}
        >
          <GridContainer direction="column" spacing={1}>
            {this.renderHeading()}
            <GridItem>
              <DayHeader
                tabId={tabId}
                dayId={dayId}
                index={index}
                hasSections={hasSections}
                toggleEdit={this.toggleEdit}
                editing={editing}
              />
            </GridItem>
            <GridItem>{this.renderDay()}</GridItem>
          </GridContainer>
        </div>
      </Scroll.Element>
    );
  };
}

Day.propTypes = {
  id: PropTypes.string, // for auto scroll purpose.
  dayId: PropTypes.number.isRequired,
  dayPhotoId: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object,
  selected: PropTypes.bool,
  hasContent: PropTypes.bool,
  hasSections: PropTypes.bool,
  content: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  addNewSectionRequested: PropTypes.bool,
  willBeEdited: PropTypes.bool,
  showEventDetail: PropTypes.bool,
  tabId: PropTypes.number,
  isPublic: PropTypes.bool,

  // from resaga
  templateId: PropTypes.number,
  discussionDrawerNodeId: PropTypes.number,
  icon: PropTypes.string,
  placeId: PropTypes.string,
  fk: PropTypes.number,
  timeZoneId: PropTypes.string,
  oldMetaInfo: PropTypes.object,
  isNew: PropTypes.bool,
  editable: PropTypes.bool,
  editing: PropTypes.bool,
  marginLeft: PropTypes.bool,
  checklists: PropTypes.array,
};

Day.defaultProps = {
  hasSections: false,
  addNewSectionRequested: false,
  willBeEdited: false,
  isPublic: false,

  templateId: 0,
  icon: null,
  placeId: null,
  timeZoneId: null,
  oldMetaInfo: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotate: 0,
    scale: 0,
    isNew: false,
  },
  checklists: [],
};

export default compose(
  withStyles(style, { name: 'Day' }),
  resaga(CONFIG),
)(Day);
