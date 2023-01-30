import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { MOVE_NODE_AFTER, MOVE_NODE_BEFORE, NODE_API } from 'apis/constants';
import {
  BADGE,
  DEFAULT,
  TOUR_ITINERARY,
  URL_HELPERS,
  LIST,
  ICON_BUTTON,
  FLAT_BUTTON,
} from 'appConstants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import tabs from 'datastore/templateManagementStore/helpers/tabs';
import { get, last } from 'lodash';
import momentjs from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { scroller } from 'react-scroll';
import Scrollspy from 'react-scrollspy';
import { compose } from 'redux';
import resaga from 'resaga';
import DraggableNode from 'smartComponents/Node/components/DraggableNode';
import Heading from 'smartComponents/Node/parts/Heading';
import NameSummary from 'smartComponents/Node/parts/NameSummary';
import InsertNode from 'smartComponents/Node/components/InsertNode';
import Content from 'smartComponents/Node/parts/Content';
import AttachmentWithEventIds from 'smartComponents/Node/components/Attachments/attachmentWithEventIds';
import { EventCount } from 'smartComponents/Node/logics';
import EventOnDayWithEventIds from 'smartComponents/Node/logics/EventsOnDay/eventOnDayWithEventIds';
import UGButton from 'ugcomponents/Buttons/Button';
import Icon from 'ugcomponents/Icon';
import LoadingText from 'ugcomponents/Progress/LoadingText';
import { scrollOptions } from 'utils/constant';
import { EVENT_GROUPINGS } from 'utils/constants/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { moment } from 'utils/index';
import { DAY, CHECKLIST, ACTIVITY } from 'utils/modelConstants';
import Button from 'viewComponents/Button';
import TabGallery from 'smartComponents/Node/types/TabGallery';
import { withRouter } from 'react-router-dom';
import { pluralizeText } from 'utils/stringAdditions';
import ChecklistIcon from 'smartComponents/Node/components/ChecklistIcon';
import Duration from 'smartComponents/Node/parts/Duration';
import { VARIANTS } from 'variantsConstants';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import IconButton from 'ugcomponents/Buttons/IconButton/index';
import EventsOnDay from './components/EventsOnDay';
import { CONFIG } from './config';
import styles from './styles';

export const ITINERARY = 'ITINERARY';
export const ACCOMMODATIONS = 'ACCOMMODATIONS';
export const ACTIVITIES = 'ACTIVITIES';
export const FOOD = 'FOOD';
export const TRANSPORTATION = 'TRANSPORTATION';
export const ATTACHMENT = 'ATTACHMENT';

export class Overview extends PureComponent {
  state = {
    hoverTop: [],
    hoverBottom: [],
    hoverIcon: [],
    hoverRow: [],
    loading: [],
    activeId: this.props.selectedId,
    // headerValue: this.props.selectedOverviewType || ITINERARY,
  };

  componentWillMount = () => {
    const { classes } = this.props;

    this.inputProps = {
      classes: {
        underline: classes.underline,
        focused: classes.focused,
        error: classes.error,
        disabled: classes.disabled,
      },
    };
  };

  componentWillUnmount = () => {
    clearTimeout(this.scrollTo);
  };

  onDragEnd = ({ destination, source, reason }) => {
    const sourceIndex = get(source, 'index', -1);
    const destinationIndex = get(destination, 'index', -1);

    if (
      destinationIndex === -1 ||
      reason === 'CANCEL' ||
      sourceIndex === destinationIndex
    )
      return false;

    this.updateServer(sourceIndex, destinationIndex);
    this.updateStore(sourceIndex, destinationIndex);

    return true;
  };

  updateServer = (source, destination) => {
    const { parentId, ids } = this.props;

    const ACTION = destination < source ? MOVE_NODE_BEFORE : MOVE_NODE_AFTER;

    this.props.resaga.dispatchTo(NODE_API, ACTION, {
      payload: {
        id: get(ids, destination),
        toBeMovedId: get(ids, source),
        tabId: parentId,
        children: ids, // for revert purpose when something goes wrong
      },
      onSuccess: this.moveSuccess,
    });
  };

  updateStore = (source, destination) => {
    const { parentId } = this.props;

    return this.props.resaga.setValue({
      nodes: tabs.moveChildren(parentId, source, destination),
    });
  };

  moveSuccess = ({ id }) => {
    this.handleClick(id)();
    this.updateTimes();
  };

  updateTimes = () => {
    const { timelineId, type } = this.props;

    if (type === DAY) {
      NODE_API_HELPERS.getTreeAndTimes({ id: timelineId }, this.props);
    }
  };

  editable = () => {
    const { editable, type } = this.props;

    return ability.can('create', type) && editable;
  };

  canExecuteCheckList = () => ability.can('execute', CHECKLIST);

  showInsertBefore = (id, prevId) =>
    this.hoverTop(id) ||
    this.hoverBottom(prevId) ||
    this.hoverIcon(id) ||
    this.loading(id);

  loading = (id = 0) => this.state[`loading${id}`];

  hoverTop = id => this.state[`hoverTop${id}`];

  hoverBottom = id => this.state[`hoverBottom${id}`];

  hoverIcon = id => !this.loading(id) && this.state[`hoverIcon${id}`];

  hoverRow = id => this.state[`hoverRow${id}`];

  rowEnter = id => () => this.setState({ [`hoverRow${id}`]: true });

  rowLeave = id => () => this.setState({ [`hoverRow${id}`]: false });

  iconEnter = id => () => this.setState({ [`hoverIcon${id}`]: true });

  iconLeave = id => () => this.setState({ [`hoverIcon${id}`]: false });

  topEnter = id => () => this.setState({ [`hoverTop${id}`]: true });

  topLeave = id => () => this.setState({ [`hoverTop${id}`]: false });

  bottomEnter = id => () => this.setState({ [`hoverBottom${id}`]: true });

  bottomLeave = id => () => this.setState({ [`hoverBottom${id}`]: false });

  handleCreateSuccess = ({ node: { id } }, { id: loadingNode }) => {
    this.scrollTo = setTimeout(this.handleClick(id, false), 100);

    this.setState({ [`loading${loadingNode}`]: false });
  };

  getLayout = () => {
    const { layout, type } = this.props;
    return LOGIC_HELPERS.ifElse(type === DAY, layout, LIST);
  };

  scrolling = (selectedId, scrollOtion) => () => {
    scroller.scrollTo(`scroller-node-${selectedId}`, scrollOtion);
  };

  handleClick = (selectedId, scrollTimer = true) => () => {
    const { templateId, type } = this.props;
    const layout = this.getLayout();
    const scrollOtion = LOGIC_HELPERS.ifElse(
      type !== DAY,
      { ...scrollOptions, offset: -100 },
      scrollOptions,
    );

    this.setState({ activeId: selectedId });
    // const search = parseQueryParam(location.search);
    if (layout === 'day' && type === DAY) {
      if (scrollTimer) {
        this.scrollTo = setTimeout(
          this.scrolling(selectedId, scrollOtion),
          200,
        );
      }
      return this.props.resaga.setValue({ selectedId });

      // return scroller.scrollTo(`scroller-node-${selectedId}`, scrollOtion);
    }
    if (type === ACTIVITY) {
      this.props.resaga.setValue({ selectedId });
    }
    if (selectedId === templateId) {
      return scroller.scrollTo(`scrollToTop`, scrollOtion);
    }

    return scroller.scrollTo(`scroller-node-${selectedId}`, scrollOtion);
  };

  goToDayView = selectedId => () => {
    this.props.resaga.setValue({ selectedId, layout: 'day' });
  };

  selectDay = selectedId => this.handleClick(selectedId)();

  handleInsertButton = (onClick, id) => (...params) => {
    this.setState({ [`loading${id}`]: true });
    this.iconLeave(id)();

    LOGIC_HELPERS.ifFunction(onClick, params);
  };

  date = index => {
    const { startDate } = this.props;

    if (!startDate) return null;

    const date = momentjs(startDate).add(index, 'days');

    return moment.renderDateShorter(date);
  };

  showDayTitle = () => {
    this.props.resaga.setValue({ headerValue: ITINERARY });
    // this.setState({ headerValue: ITINERARY });
  };

  showAccommodations = () => {
    this.props.resaga.setValue({ headerValue: ACCOMMODATIONS });
    // this.setState({ headerValue: ACCOMMODATIONS });
  };

  showActivity = () => {
    this.props.resaga.setValue({ headerValue: ACTIVITIES });
    // this.setState({ headerValue: ACTIVITIES });
  };

  showFood = () => {
    this.props.resaga.setValue({ headerValue: FOOD });
    // this.setState({ headerValue: FOOD });
  };

  showTransportation = () => {
    this.props.resaga.setValue({ headerValue: TRANSPORTATION });
    // this.setState({ headerValue: TRANSPORTATION });
  };

  showAttachment = () => {
    this.props.resaga.setValue({ headerValue: ATTACHMENT });
    // this.setState({ headerValue: ATTACHMENT });
  };

  showChecklist = () => {
    this.props.resaga.setValue({ headerValue: CHECKLIST });
    // this.setState({ headerValue: CHECKLIST });
  };

  grouping = headerValue =>
    LOGIC_HELPERS.switchCase(headerValue, {
      [ACCOMMODATIONS]: EVENT_GROUPINGS.accommodationGrouping,
      [TRANSPORTATION]:
        EVENT_GROUPINGS.transportationWithFlightStartEndGrouping,
      [FOOD]: EVENT_GROUPINGS.foodGrouping,
      [ATTACHMENT]: EVENT_GROUPINGS.allEvents,
      [DEFAULT]: EVENT_GROUPINGS.activityGrouping,
    });

  renderGallery = id => {
    const { showGallery, templateId, galleryId, headerValue } = this.props;

    if (!showGallery || headerValue !== ITINERARY) return null;
    return (
      <TabGallery
        variant={BADGE}
        id={galleryId}
        templateId={templateId}
        filtered
        dayId={id}
      />
    );
  };

  renderAttachment = id => {
    const { headerValue } = this.props;
    if (headerValue !== ATTACHMENT) return null;
    return <AttachmentWithEventIds id={id} variant={LIST} />;
  };

  renderChecklist = ({ id, index }) => {
    const { classes, headerValue } = this.props;
    if (headerValue !== CHECKLIST) return null;
    return (
      <GridContainer className={classes.checklist}>
        <GridItem>
          <ChecklistIcon
            parentNodeId={id}
            index={index}
            checklistsClass={classnames(classes.checklists)}
            iconClass={classes.checklistDay}
            showEmpty // {layout === DAY}
            defaultShowChecklists={false} // >={layout === DAY && checklists.length > 0}
            showAddButton
            variant={ICON_BUTTON}
            small
            stopPropagation={false}
            xsIcon
            showChecklists
            stopPropogateShowClose
          />
        </GridItem>
      </GridContainer>
    );
  };

  renderSubHeader = (id, index) => {
    const { classes, startDate } = this.props;

    if (!startDate) return null;

    if (!this.isDayrow(index)) {
      return (
        <GridItem className={classes.prefix}>
          <Duration id={id} showIcon={false} />
        </GridItem>
      );
    }

    return (
      <GridItem className={classes.prefix}>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem className={classes.grow}>{this.date(index)}</GridItem>
          <GridItem>{this.renderGallery(id)}</GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  isDayrow = index => index !== -1;

  renderEventsOnDay = props => <EventsOnDay {...props} />;

  renderContent = (
    { id, index, headerValue, iconHovered, editable, active },
    dragHandleProps = {},
  ) => {
    const { classes, ids } = this.props;

    let content;
    const title = (
      <GridItem>
        <NameSummary
          id={id}
          editable={editable}
          showEmpty
          ellipsis
          className={classnames(classes.content)}
          ellipsisClassName={classnames(
            LOGIC_HELPERS.ifElse(
              editable,
              classes.ellipsisEditDiv,
              classes.ellipsisViewDiv,
            ),
          )}
        />
      </GridItem>
    );

    if (headerValue === ITINERARY) {
      content = title;
    } else if (headerValue === ATTACHMENT) {
      content = (
        <React.Fragment>
          {title}
          {this.renderAttachment(id)}
        </React.Fragment>
      );
    } else if (headerValue === CHECKLIST) {
      content = (
        <React.Fragment>
          {title}
          {this.renderChecklist({ id, index })}
        </React.Fragment>
      );
    } else {
      content = (
        <>
          {title}
          <EventOnDayWithEventIds
            id={id}
            variant={headerValue}
            grouping={this.grouping(headerValue)}
          >
            {this.renderEventsOnDay}
          </EventOnDayWithEventIds>
        </>
      );
    }

    return (
      <GridContainer direction="column">
        <Heading
          id={id}
          xs
          component={GridItem}
          editable={false}
          className={classes.title}
          first={index === 0}
        />
        <GridItem>
          <div
            className={classnames(
              classes.item,
              LOGIC_HELPERS.ifElse(active, classes.itemActive),
              this.editable() && classes.draggableItem,
              classes.relative,
              LOGIC_HELPERS.ifElse(
                iconHovered,
                classes.borderActive,
                classes.borderNonActive,
              ),
            )}
          >
            <GridContainer
              wrap="nowrap"
              alignItems={LOGIC_HELPERS.ifElse(
                headerValue === ITINERARY,
                'center',
                'flex-start',
              )}
            >
              <GridItem>
                {this.isDayrow(index) ? (
                  <div className={classes.index}>{index + 1}</div>
                ) : (
                  <div className={classes.index}>
                    <Icon size="small" icon="lnr-home2" color="#2cbe4e" />
                  </div>
                )}
              </GridItem>
              {this.editable() && (
                <GridItem>
                  <div
                    className={classnames(classes.dragHandle, classes.move)}
                    {...dragHandleProps}
                  >
                    {ids.length > 1 && this.isDayrow(index) && (
                      <IconButton
                        disabled
                        tooltip="Drag and Drop to move this Day"
                        variant={FLAT_BUTTON}
                        className={classes.marginMoveButton}
                        transparent
                      >
                        <Icon icon="lnr-move" />
                      </IconButton>
                    )}
                  </div>
                </GridItem>
              )}
              <GridItem className={classes.grow}>
                <GridContainer direction="column" spacing={0}>
                  {this.renderSubHeader(id, index)}
                  {content}
                </GridContainer>
              </GridItem>
            </GridContainer>

            {this.editable() && (
              <div className={classes.absolute}>
                <GridContainer
                  direction="column"
                  spacing={0}
                  className={classes.height}
                >
                  <GridItem
                    className={classnames(classes.forHover, classes.grow)}
                    onMouseEnter={this.topEnter(id)}
                    onMouseLeave={this.topLeave(id)}
                  >
                    &nbsp;
                  </GridItem>
                  <GridItem
                    className={classnames(classes.forHover, classes.grow)}
                    onMouseEnter={this.bottomEnter(id)}
                    onMouseLeave={this.bottomLeave(id)}
                  >
                    &nbsp;
                  </GridItem>
                </GridContainer>
              </div>
            )}
          </div>
        </GridItem>
      </GridContainer>
    );
  };

  renderDraggableContent = (provided, props) => (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      {this.renderContent(props, provided.dragHandleProps)}
    </div>
  );

  renderInsertBeforeButton = ({
    insertBefore,
    onClick,
    loading,
    hovered,
    isLoading: isInserting,
  }) => {
    const { classes } = this.props;
    const isLoading = loading || isInserting;

    const handleClick = LOGIC_HELPERS.ifElse(
      isInserting,
      undefined,
      this.handleInsertButton(onClick, insertBefore),
    );

    return (
      <GridContainer
        alignItems="center"
        spacing={0}
        onMouseEnter={this.iconEnter(insertBefore)}
        onMouseLeave={this.iconLeave(insertBefore)}
        onClick={handleClick}
      >
        <GridItem>
          <div
            className={classnames(
              LOGIC_HELPERS.ifElse(isLoading, classes.loading),
            )}
          >
            <Icon
              size="xsmall"
              color="grey"
              bold
              icon={LOGIC_HELPERS.ifElse(isLoading, 'lnr-refresh2', 'lnr-plus')}
              className={classnames(
                classes.icon,
                LOGIC_HELPERS.ifElse(
                  [hovered, !isInserting],
                  classes.iconHovered,
                  null,
                ),
              )}
            />
          </div>
        </GridItem>
      </GridContainer>
    );
  };

  renderInsertBefore = (id, prevId) => {
    const { classes, parentId } = this.props;

    const loading = this.loading(id);

    return (
      this.editable() &&
      this.showInsertBefore(id, prevId) && (
        <div className={classes.plusTop}>
          <InsertNode
            parentId={parentId}
            insertBefore={id}
            renderButton={this.renderInsertBeforeButton}
            onSuccess={this.handleCreateSuccess}
            value={this.loading(id)}
            loading={loading}
            hovered={this.hoverIcon(id)}
          />
        </div>
      )
    );
  };

  renderRowContent = (id, index) => {
    const { selectedId, startDate, headerValue } = this.props;
    const { activeId } = this.state;
    const layout = this.getLayout();
    const props = {
      id,
      index,
      headerValue,
      selectedId,
      // hovered: this.hoverRow(id),
      iconHovered: this.hoverIcon(id),
      editable: this.editable(),
      layout,
      startDate,
      active: layout === DAY ? selectedId === id : activeId === id,
    };

    if (this.editable() && this.isDayrow(index)) {
      return (
        <DraggableNode key={id} {...props}>
          {this.renderDraggableContent}
        </DraggableNode>
      );
    }
    return this.renderContent(props);
  };

  renderRow = (id, index, prevId) => {
    const { classes } = this.props;
    return (
      <GridItem
        onMouseEnter={LOGIC_HELPERS.ifElse(this.editable(), this.rowEnter(id))}
        onMouseLeave={LOGIC_HELPERS.ifElse(this.editable(), this.rowLeave(id))}
        key={id}
      >
        <div className={classes.relative}>
          <GridContainer direction="column" wrap="nowrap" spacing={0}>
            <GridItem onClick={this.handleClick(id)}>
              {this.renderRowContent(id, index)}
            </GridItem>
          </GridContainer>

          {this.isDayrow(index) && this.renderInsertBefore(id, prevId)}
        </div>
      </GridItem>
    );
  };

  renderNewNodeButton = ({
    onClick,
    typeText,
    loading,
    isLoading: isInserting,
  }) => {
    const { classes } = this.props;

    const handleClick = LOGIC_HELPERS.ifElse(
      isInserting,
      undefined,
      this.handleInsertButton(onClick),
    );

    const isLoading = loading || isInserting;

    return (
      <UGButton
        block
        inline
        color="grey"
        size="xsmall"
        textAlign="left"
        onClick={handleClick}
        disabled={isInserting}
        className={classnames(
          classes.item,
          classes.newItem,
          classes.indentLeft,
          LOGIC_HELPERS.ifElse(isLoading, classes.itemNoHover),
        )}
      >
        <GridContainer alignItems="center">
          <GridItem className={classes.grow}>
            {isLoading ? <LoadingText text="Creating" /> : `New ${typeText}`}
          </GridItem>
          {!isLoading && !isInserting && (
            <GridItem>
              <Icon size="small" color="grey" bold icon="lnr-plus" />
            </GridItem>
          )}
        </GridContainer>
      </UGButton>
    );
  };

  renderNewNode = () => {
    const { parentId, ids, type } = this.props;

    if (!this.editable()) return null;

    const isLoading = this.loading();
    const insertAfter = last(ids);

    if (!insertAfter) return null;

    return (
      <GridItem>
        <InsertNode
          parentId={parentId}
          insertAfter={insertAfter}
          renderButton={this.renderNewNodeButton}
          onSuccess={this.handleCreateSuccess}
          loading={isLoading}
          value={`${isLoading}${insertAfter}`}
          type={type}
        />
      </GridItem>
    );
  };

  renderShowDownload = () => {
    const {
      classes,
      templateId,
      showDownload,
      isPublic,
      tabPrint,
    } = this.props;
    const pubUrl = this.getPublicPrint();
    const tourPrint = URL_HELPERS.tourPrint(templateId);
    const tabCustomPrint = this.getTourTabPrintUrl();
    const tabPubCustomPrint = this.getPubTourTabPrintUrl();
    let url = LOGIC_HELPERS.ifElse(tabPrint, tabCustomPrint, tourPrint);
    if (isPublic) {
      url = LOGIC_HELPERS.ifElse(tabPrint, tabPubCustomPrint, pubUrl);
    }

    return (
      (showDownload || tabPrint) && (
        <GridItem>
          <a href={url} target="_blank">
            <Button
              color="base"
              size="xs"
              className={classes.printButton}
              title="Open print view"
            >
              Print <Icon icon="lnr-launch" size="xsmall" paddingLeft />
            </Button>
          </a>
        </GridItem>
      )
    );
  };

  getPublicPrint = () => {
    const { history } = this.props;
    const { pathname } = history.location;

    const index = 17;
    const baseURL = '/public/template';
    const prefixURL = `${baseURL}/2/`;
    return `${prefixURL}${pathname.slice(index)}`;
  };

  getTourTabPrintUrl = () => {
    const { parentId, templateId } = this.props;
    return URL_HELPERS.tourTabPrint({ id: templateId, tabId: parentId });
  };

  getPubTourTabPrintUrl = () => {
    const { parentId } = this.props;
    const pathname = this.getPublicPrint();
    return `${pathname}?tabId=${parentId}`;
  };

  renderTimelineContent = (isLabel = false) => {
    const { timelineId, smDown } = this.props;
    const smUpSize = LOGIC_HELPERS.ifElse(isLabel, 20, 45);
    return (
      <Content
        id={timelineId}
        variant={VARIANTS.VALUE_ONLY}
        maxChars={LOGIC_HELPERS.ifElse(smDown, 30, smUpSize)}
      />
    );
  };

  renderHeaderButton = data => ({ openMenu }) => {
    const { classes } = this.props;
    const { headerValue } = this.props;

    const renderHeader = LOGIC_HELPERS.switchCase(headerValue, {
      [ITINERARY]: 'Tour Itinerary',
      [ACCOMMODATIONS]: 'Accommodation',
      [ACTIVITIES]: 'Activity',
      [FOOD]: 'Food',
      [TRANSPORTATION]: 'Transportation',
      [ATTACHMENT]: 'Attachment',
      [CHECKLIST]: 'Checklists',
    });

    const renderHeaderPlural = this.plularalizeHeader(
      headerValue,
      renderHeader,
      Number.parseInt(get(data, `eventCounts.${headerValue}`, 0), 0),
    );

    return (
      <Button
        color="inline"
        size="xs"
        onClick={openMenu}
        className={classes.headerButton}
      >
        <GridContainer alignItems="center" spacing={0} wrap="nowrap">
          <GridItem>
            {LOGIC_HELPERS.ifElse(
              ITINERARY === headerValue,
              this.renderTimelineContent(true),
              renderHeaderPlural,
            )}
          </GridItem>
          <GridItem>
            <Icon icon="lnr-chevron-down" size="xsmall" paddingLeft />
          </GridItem>
        </GridContainer>
      </Button>
    );
  };

  plularalizeHeader = (header, text, count) =>
    pluralizeText(text || ITINERARY, LOGIC_HELPERS.ifElse(count <= 1, 1, 2));

  renderHeaderMenu = data => ({ closeMenu }) => {
    const { isPublic, headerValue } = this.props;

    return (
      <GridContainer direction="column" spacing={0}>
        <GridItem>
          <MenuItem
            selected={headerValue === ITINERARY}
            closeMenu={closeMenu}
            onClick={this.showDayTitle}
          >
            {this.renderTimelineContent()}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={headerValue === ACCOMMODATIONS}
            closeMenu={closeMenu}
            onClick={this.showAccommodations}
          >
            {this.plularalizeHeader(
              ACCOMMODATIONS,
              'Accommodation',
              Number.parseInt(get(data, `eventCounts.${ACCOMMODATIONS}`, 0), 0),
            )}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={headerValue === ACTIVITIES}
            closeMenu={closeMenu}
            onClick={this.showActivity}
          >
            {this.plularalizeHeader(
              ACTIVITIES,
              'Activity',
              Number.parseInt(get(data, `eventCounts.${ACTIVITIES}`, 0), 0),
            )}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={headerValue === FOOD}
            closeMenu={closeMenu}
            onClick={this.showFood}
          >
            {this.plularalizeHeader(
              FOOD,
              'Food',
              Number.parseInt(get(data, `eventCounts.${FOOD}`, 0), 0),
            )}
          </MenuItem>
        </GridItem>
        <GridItem>
          <MenuItem
            selected={headerValue === TRANSPORTATION}
            closeMenu={closeMenu}
            onClick={this.showTransportation}
          >
            {this.plularalizeHeader(
              TRANSPORTATION,
              'Transportation',
              Number.parseInt(get(data, `eventCounts.${TRANSPORTATION}`, 0), 0),
            )}
          </MenuItem>
        </GridItem>
        {!isPublic && (
          <GridItem>
            <MenuItem
              selected={headerValue === ATTACHMENT}
              closeMenu={closeMenu}
              onClick={this.showAttachment}
            >
              {this.plularalizeHeader(
                ATTACHMENT,
                'Attachment',
                Number.parseInt(get(data, `eventCounts.${ATTACHMENT}`, 0), 0),
              )}
            </MenuItem>
          </GridItem>
        )}
        {!isPublic && this.canExecuteCheckList() && (
          <GridItem>
            <MenuItem
              selected={headerValue === CHECKLIST}
              closeMenu={closeMenu}
              onClick={this.showChecklist}
            >
              {this.plularalizeHeader(
                CHECKLIST,
                'Checklist',
                Number.parseInt(get(data, `eventCounts.${CHECKLIST}`, 0), 0),
              )}
            </MenuItem>
          </GridItem>
        )}
      </GridContainer>
    );
  };

  renderHeaderWrapper = () => {
    const { templateId, ids } = this.props;

    return (
      <EventCount id={templateId} ids={ids}>
        {this.renderHeader}
      </EventCount>
    );
  };

  renderHeader = data => {
    const { classes, header, variant, headerValue } = this.props;

    if (!header && !variant) return null;

    let renderHeader = header;

    if (variant === TOUR_ITINERARY) {
      renderHeader = (
        <Popper
          renderButton={this.renderHeaderButton(data)}
          value={headerValue}
          noPadding
          menuHeader="Filter by"
          placement="bottom-start"
        >
          {this.renderHeaderMenu(data)}
        </Popper>
      );
    }

    return (
      <GridItem>
        <div
          className={classnames(classes.headerPadding, classes.paddingBottom)}
        >
          <GridContainer alignItems="center">
            <GridItem>
              <div className={classes.index}>#</div>
            </GridItem>
            <GridItem className={classes.grow}>
              <GridContainer alignItems="center" spacing={0}>
                <GridItem>
                  <div className={classes.header}>{renderHeader}</div>
                </GridItem>
              </GridContainer>
            </GridItem>
            {this.renderShowDownload()}
          </GridContainer>
        </div>
      </GridItem>
    );
  };

  renderDroppableContent = () => {
    const { ids } = this.props;
    return ids.map((id, index) =>
      this.renderRow(id, index, index > 0 && ids[index - 1]),
    );
  };

  renderDroppable = () => provided => (
    <div {...provided.droppableProps} ref={provided.innerRef}>
      {this.renderDroppableContent()}
      {provided.placeholder}
    </div>
  );

  renderBody = () => {
    const {
      classes,
      ids,
      showEmpty,
      placeholder,
      bodyClassName,
      templateId,
      headerValue,
      type,
      parentId,
    } = this.props;
    let renderBody;

    if (!ids.length) {
      if (!showEmpty) return null;

      return (
        <GridItem>
          <div className={classes.placeholder}>{placeholder}</div>
        </GridItem>
      );
    }

    if (this.editable()) {
      renderBody = (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId={`overview-droppable-${type}-${parentId}`}
            type="SECTION"
          >
            {this.renderDroppable(ids)}
          </Droppable>
        </DragDropContext>
      );
    } else {
      renderBody = this.renderDroppableContent();
    }

    return (
      <GridItem className={bodyClassName}>
        <GridContainer
          direction="column"
          wrap="nowrap"
          spacing={0}
          alignItems="flex-start"
        >
          {headerValue === CHECKLIST && (
            <GridItem>{this.renderRow(templateId, -1)}</GridItem>
          )}
          {renderBody}
        </GridContainer>
      </GridItem>
    );
  };

  handleScroll = item => {
    const { type } = this.props;
    if (!item) return null;

    const nodeId = Number.parseInt(item.id.replace(type, ''), 10);
    if (nodeId) {
      this.setState({ activeId: nodeId });
    }

    return null;
  };

  render = () => {
    const {
      classes,
      showEmpty,
      ids,
      cardClassName,
      type,
      headerValue,
      templateId,
    } = this.props;
    if (!showEmpty && !ids.length) return null;

    const scrollIds = LOGIC_HELPERS.ifElse(
      headerValue === CHECKLIST,
      [templateId, ...ids],
      ids,
    );

    return (
      <>
        <Scrollspy
          items={scrollIds.map(id => `${type}${id}`)}
          onUpdate={this.handleScroll}
          offset={-94}
        />
        <GridContainer
          card
          dense
          direction="column"
          className={classes.root}
          cardClassName={cardClassName}
        >
          {this.renderHeaderWrapper()}

          {this.renderBody()}

          {this.renderNewNode()}
        </GridContainer>
      </>
    );
  };
}

Overview.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  smDown: PropTypes.bool,
  // parent props
  templateId: PropTypes.number,
  timelineId: PropTypes.number,
  parentId: PropTypes.number,
  ids: PropTypes.array,
  startDate: PropTypes.string,
  variant: PropTypes.string,
  cardClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.node,
  header: PropTypes.node,
  showDownload: PropTypes.bool,
  showFeedbacks: PropTypes.bool,
  editable: PropTypes.bool,
  showEmpty: PropTypes.bool,
  galleryId: PropTypes.number,
  showGallery: PropTypes.bool,
  isPublic: PropTypes.bool,
  tabPrint: PropTypes.bool,
  headerValue: PropTypes.string,

  // resaga props
  selectedId: PropTypes.number,
  layout: PropTypes.string,
};

Overview.defaultProps = {
  ids: [],
  placeholder: 'No content yet',
  layout: 'list',
  isPublic: false,
  headerValue: ITINERARY,
};

export default compose(
  withRouter,
  withStyles(styles, { name: 'Overview' }),
  resaga(CONFIG),
  withSMDown,
)(Overview);
