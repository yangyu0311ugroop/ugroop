import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import GridItem from 'components/GridItem';
import GridContainer from 'components/GridContainer';
import Icon from 'viewComponents/Icon';
import { withEventsOnDay } from 'smartComponents/Node/hoc';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DEFAULT, SUMMARY, LIST, LINK } from 'appConstants';
import { TooltipIconButton } from 'containers/Templates/TemplateManagement/components/Event/components/Buttons';

import Popper from 'components/Popper';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';

import { CONFIG, CONFIG2, CONFIG3 } from './config';
import styles from './styles';
import EventWrapper from './components/EventWrapper';
import AttachmentItem from './components/AttachmentItem';

export const MAX_IDS = 3;

export class Attachments extends PureComponent {
  state = {
    anchorEl: null,
    blockOpening: false,
  };

  openMoreMenu = event => {
    const { blockOpening } = this.state;
    this.stopPropagation(event);

    if (!blockOpening) {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  stopPropagation = event => event.stopPropagation();

  closeMoreMenu = event => {
    this.stopPropagation(event);
    this.setState({ anchorEl: null });

    this.blockOpening = setTimeout(
      () => this.setState({ blockOpening: false }),
      100,
    );
    return this.setState({ blockOpening: true });
  };

  renderMoreLabel = () => {
    const { attachmentIds, eventAttachmentsIds, classes } = this.props;
    const allAttachments = [...attachmentIds, ...eventAttachmentsIds];
    if (!allAttachments.length) return null;
    return (
      <GridItem className={classes.moreListLabel}>{`See All Attachments (${
        allAttachments.length
      })`}</GridItem>
    );
  };

  renderModePopperButton = () => (
    <Button
      variant={VARIANTS.BORDERLESS}
      dense
      size="extraSmal"
      onClick={this.openMoreMenu}
      noPadding={this.props.variant === LIST}
    >
      <GridContainer alignItems="baseline" wrap="nowrap" spacing={0}>
        <GridItem>
          {this.props.variant === SUMMARY && this.renderSummary()}
        </GridItem>
        {this.props.variant === LIST && this.renderMoreLabel()}
      </GridContainer>
    </Button>
  );

  renderMenuHeader = menuHeader => {
    const { classes } = this.props;

    if (!menuHeader) return null;

    return (
      <GridItem>
        <div className={classes.menuHeader}>{menuHeader}</div>
      </GridItem>
    );
  };

  renderModePopperOptions = () => (
    <GridContainer direction="column" spacing={0}>
      {this.renderSectionAttachmentList()}
      {this.renderEventAttachmentList()}
    </GridContainer>
  );

  renderModePopper = () => {
    const { attachmentIds, eventAttachmentsIds } = this.props;
    if (![...attachmentIds, ...eventAttachmentsIds].length) return null;
    return (
      <GridContainer>
        <GridItem>{this.renderModePopperButton()}</GridItem>
        <GridItem>
          <Popper
            placement="bottom"
            stopPropagation
            anchorEl={this.state.anchorEl}
            onClose={this.closeMoreMenu}
            className={this.props.classes.popper}
          >
            {this.renderModePopperOptions}
          </Popper>
        </GridItem>
      </GridContainer>
    );
  };

  eventAttachmentIcon = data => {
    const { id: dayId } = this.props;
    const { eventAttachments, id, position } = data;
    if (!eventAttachments || eventAttachments.length === 0) return null;
    return (
      <GridItem>
        <TooltipIconButton
          id={id}
          dayId={dayId}
          position={position}
          showSublabel={false}
          size="xs"
          showSubIcon={false}
          attachmentOnly
        />
      </GridItem>
    );
  };

  renderEventAttachmentList = (showHeader = true, limit = false, variant) => {
    const { attachmentIds, eventAttachmentsIds, classes } = this.props;
    if (!eventAttachmentsIds || eventAttachmentsIds.length === 0) return null;
    const max = MAX_IDS - attachmentIds.length;
    if (limit && max < 1) return null;
    const content = eventAttachmentsIds
      .slice(0, LOGIC_HELPERS.ifElse(limit, max, eventAttachmentsIds.length))
      .map(id => (
        <GridItem key={`event-${id}`} className={classes.items}>
          <AttachmentItem
            id={id}
            type="events"
            variant={LOGIC_HELPERS.ifElse(variant === LIST, LINK)}
            compact={variant === LIST}
          />
        </GridItem>
      ));
    return (
      <React.Fragment>
        {showHeader && this.renderMenuHeader('Event Attachments')}
        {content}
      </React.Fragment>
    );
  };

  renderSectionAttachmentList = (showHeader = true, limit = false, variant) => {
    const { attachmentIds, classes } = this.props;
    if (!attachmentIds || attachmentIds.length === 0) return null;
    const content = attachmentIds
      .slice(0, LOGIC_HELPERS.ifElse(limit, MAX_IDS, attachmentIds.length))
      .map(id => (
        <GridItem key={`sections-${id}`} className={classes.items}>
          <AttachmentItem
            id={id}
            variant={LOGIC_HELPERS.ifElse(variant === LIST, LINK)}
            compact={variant === LIST}
          />
        </GridItem>
      ));
    return (
      <React.Fragment>
        {showHeader && this.renderMenuHeader('Section Attachments')}
        {content}
      </React.Fragment>
    );
  };

  renderList = () => {
    const { attachmentIds, eventAttachmentsIds } = this.props;
    const ids = [...attachmentIds, ...eventAttachmentsIds];
    return (
      <GridContainer direction="column" spacing={0}>
        {this.renderSectionAttachmentList(false, true, LIST)}
        {this.renderEventAttachmentList(false, true, LIST)}
        {ids.length > MAX_IDS && this.renderModePopper()}
      </GridContainer>
    );
  };

  renderEventAttachments = () => {
    const { eventDataIds, events } = this.props;
    const content = eventDataIds.map((id, index) => (
      <EventWrapper dataId={id} event={events[index]}>
        {this.eventAttachmentIcon}
      </EventWrapper>
    ));
    return content;
  };

  renderDefault = () => (
    <GridContainer spacing={0}>{this.renderEventAttachments()}</GridContainer>
  );

  renderSummary = () => {
    const { attachmentIds, eventAttachmentsIds } = this.props;
    const allAttachments = [...attachmentIds, ...eventAttachmentsIds];
    if (!allAttachments.length) return null;
    return (
      <GridContainer wrap="nowrap" spacing={0}>
        <GridItem>
          <Icon icon="lnr-paperclip" size="xsmall" color="lavender" />
        </GridItem>
        <GridItem>{`${allAttachments.length}`}</GridItem>
      </GridContainer>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [SUMMARY]: this.renderModePopper,
      [LIST]: this.renderList,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Attachments.propTypes = {
  // hoc props
  classes: PropTypes.object,
  events: PropTypes.array,
  eventAttachmentsIds: PropTypes.array,
  attachmentIds: PropTypes.array,
  eventDataIds: PropTypes.array,
  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,

  // resaga props
};

Attachments.defaultProps = {
  variant: '',
  attachmentIds: [],
  eventDataIds: [],
  eventAttachmentsIds: [],
};

export default compose(
  withEventsOnDay(),
  withStyles(styles, { name: 'Attachments' }),
  resaga(CONFIG),
  resaga(CONFIG2),
  resaga(CONFIG3),
)(Attachments);
