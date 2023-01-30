/**
 * Created by stephenkarpinskyj on 25/9/18.
 */

import Empty from 'components/Empty';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import Sticky from 'react-stickynode';
import { compose } from 'redux';
import resaga from 'resaga';
import { withEventsOnNoDay } from 'smartComponents/Node/hoc';
import Event from 'smartComponents/Node/types/Event';
import Icon from 'ugcomponents/Icon';
import { NODE_TIME_MODES } from 'utils/constants/nodes';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class EventsWithoutDay extends React.PureComponent {
  state = {
    sticky: false,
    showAll: false,
  };

  getEventIds = () => {
    const { events } = this.props;
    return _.uniqBy(events, 'id');
  };

  handleCreateEventClick = () => {
    const { tabId } = this.props;

    PORTAL_HELPERS.openAddEvent(
      {
        dayId: tabId,
        startMode: NODE_TIME_MODES.unanchored,
      },
      this.props,
    );
  };

  toggleSticky = () => this.setState(({ sticky: s }) => ({ sticky: !s }));

  renderEventIcon = param => {
    const { smDown, activeId, portalId, templateId } = this.props;

    return (
      <Event
        key={`${param.id}_${param.position}`}
        component={GridItem}
        smDown={smDown}
        middle={!portalId}
        simplify
        active={param.id === activeId}
        portalId={portalId}
        templateId={templateId}
        {...param}
      />
    );
  };

  renderCreateButton = () => {
    const { classes } = this.props;

    return (
      EVENT_HELPERS.canCreateEvent() && (
        <GridItem>
          <Button
            color="primary"
            size="xs"
            className={classes.smallText}
            onClick={this.handleCreateEventClick}
          >
            <GridContainer alignItems="center">
              <GridItem>
                <Icon size="xsmall" icon="lnr-plus" bold />
              </GridItem>
            </GridContainer>
          </Button>
        </GridItem>
      )
    );
  };

  renderTitle = () => {
    const { classes, portalId, renderCreateEvent } = this.props;

    if (portalId) {
      return (
        <GridContainer alignItems="center">
          <GridItem xs>
            <JText gray uppercase bold>
              <M {...m.title} />
            </JText>
          </GridItem>

          {LOGIC_HELPERS.ifFunction(renderCreateEvent)}
        </GridContainer>
      );
    }

    return (
      <GridContainer alignItems="center" wrap="nowrap">
        <GridItem>{this.renderCreateButton()}</GridItem>
        <GridItem xs>
          <div className={classes.header}>
            <M {...m.title} />
          </div>
        </GridItem>
        {/* <Hidden smDown> */}
        {/*  <GridItem> */}
        {/*    <Button */}
        {/*      size="xs" */}
        {/*      className={classnames( */}
        {/*        classes.pinButton, */}
        {/*        LOGIC_HELPERS.ifElse(sticky, classes.sticky), */}
        {/*      )} */}
        {/*      onClick={this.toggleSticky} */}
        {/*      title="Stick to screen?" */}
        {/*    > */}
        {/*      <Icon size="small" icon="lnr-pushpin" /> */}
        {/*    </Button> */}
        {/*  </GridItem> */}
        {/* </Hidden> */}
      </GridContainer>
    );
  };

  renderCloseButton = () => {
    const { onClose } = this.props;

    if (!onClose) return null;

    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap">
          <GridItem xs />

          <GridItem>
            <JButton onClick={onClose}>
              <Icon icon="lnr-cross" size="small" />
            </JButton>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderEventIcons = ids => {
    const { sticky, showAll } = this.state;
    const { maxContent } = this.props;
    // let idsToShow = LOGIC_HELPERS.ifElse(maxContent > 0 && maxContent < ids.length,  );
    const idsToShow = ids.slice(
      0,
      LOGIC_HELPERS.ifElse(
        [maxContent > 0, maxContent < ids.length, !showAll],
        maxContent,
        ids.length,
      ),
    );

    return (
      !!ids.length && (
        <GridContainer direction="column" spacing={0}>
          {this.renderCloseButton()}

          <GridItem>
            <GridContainer
              card
              elevation={LOGIC_HELPERS.ifElse(sticky, 2)}
              direction="column"
              spacing={2}
            >
              <GridItem>{this.renderTitle()}</GridItem>
              <GridItem>
                <GridContainer direction="column">
                  {idsToShow.map(this.renderEventIcon)}
                </GridContainer>
              </GridItem>
              {this.renderGoTo()}
            </GridContainer>
          </GridItem>
        </GridContainer>
      )
    );
  };

  toggleShow = () => {
    const { showAll } = this.state;
    this.setState({ showAll: !showAll });
  };

  renderGoTo = () => {
    const { maxContent } = this.props;
    const { showAll } = this.state;
    const ids = this.getEventIds();
    // const url = `${URL_HELPERS.tours(templateId)}?tab=${index}`;
    if (ids.length <= maxContent || !maxContent) return null;

    return (
      <GridItem>
        <JText link noUnderlined italic onClick={this.toggleShow}>
          {LOGIC_HELPERS.ifElse(
            showAll,
            'See less',
            `Show all (${ids.length})`,
          )}
        </JText>
      </GridItem>
    );
  };

  render = () => {
    const { showEmpty, children } = this.props;

    const ids = this.getEventIds();

    const events = this.renderEventIcons(ids);
    const { sticky } = this.state;

    if (children) {
      return LOGIC_HELPERS.ifFunction(children, [ids], children);
    }

    if (showEmpty && !events) {
      return <Empty title="Unplanned events" />;
    }

    return (
      <GridItem>
        <Sticky
          enabled={sticky}
          top={106}
          bottomBoundary="#LayoutContent"
          enableTransforms={false}
          innerZ={1088}
        >
          {events}
        </Sticky>
      </GridItem>
    );
  };
}

EventsWithoutDay.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  events: PropTypes.array,
  bottom: PropTypes.bool,

  // parent for hoc (note: defaultProps won't be passed to hoc)
  templateId: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  tabId: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  showEmpty: PropTypes.bool,
  smDown: PropTypes.bool,
  activeId: PropTypes.number,
  portalId: PropTypes.number,
  onClose: PropTypes.func,
  renderCreateEvent: PropTypes.func,
  maxContent: PropTypes.number,
  children: PropTypes.any,
};

EventsWithoutDay.defaultProps = {
  events: [],
  bottom: false,
  maxContent: 0,
};

export default compose(
  withStyles(styles, { name: 'EventsWithoutDay' }),
  withEventsOnNoDay(),
  resaga(CONFIG),
)(EventsWithoutDay);
