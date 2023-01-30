import classnames from 'classnames';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { withStyles } from 'components/material-ui';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import FlightBooking from 'smartComponents/Event/components/FlightBooking/layouts';
import Icon from 'ugcomponents/Icon';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { CONFIG_1, CONFIG_2 } from './config';
import m from './messages';
import styles from './styles';

export class FlightBookings extends React.PureComponent {
  show = () => {
    const { flightIds, flightBookingIds } = this.props;
    return !!flightIds.length || !!flightBookingIds.length;
  };

  handleFlightBookingCreate = dataId => {
    if (dataId) {
      const newId = Number.parseInt(dataId, 10);
      this.props.resaga.setValue({
        flightBookingView: EVENT_STORE_HELPERS.setFlightBookingView(
          true,
          newId,
        ),
      });
    }
  };

  handleCreateFlightBookingClick = () => {
    this.props.resaga.setValue({
      flightBookingCreate: EVENT_STORE_HELPERS.setFlightBookingCreate(
        true,
        this.handleFlightBookingCreate,
      ),
    });
  };

  handleEditableClick = dataId => () => {
    const { templateId, portalId } = this.props;

    return PORTAL_HELPERS.openViewEvent(
      {
        flightBookingId: dataId,
        templateId,
        showAllDays: true,
      },
      this.props,
      portalId,
    );
    // this.props.resaga.setValue({
    //   flightBookingView: EVENT_STORE_HELPERS.setFlightBookingView(true, dataId),
    // });
  };

  renderFlightBooking = dataId => {
    const {
      classes,
      selectedId,
      showAmounts,
      templateId,
      editing,
    } = this.props;

    const active = selectedId === dataId;

    return (
      <GridItem key={dataId}>
        <FlightBooking
          active={active}
          templateId={templateId}
          dataId={dataId}
          variant={EVENT_CONSTANTS.VARIANTS.option}
          showAmounts={showAmounts}
          onClick={this.handleEditableClick(dataId)}
          buttonClassName={classnames(
            classes.button,
            LOGIC_HELPERS.ifElse(active, classes.active),
          )}
          editing={editing}
        />
      </GridItem>
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
            onClick={this.handleCreateFlightBookingClick}
          >
            <GridContainer alignItems="center" wrap="noWrap">
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
    const { classes } = this.props;

    return (
      <GridContainer alignItems="center">
        {this.renderCreateButton()}
        <GridItem xs>
          <div className={classes.header}>
            <M {...m.title} />
          </div>
        </GridItem>
      </GridContainer>
    );
  };

  renderFlightBookings = ids =>
    !!ids.length && (
      <GridContainer direction="column" spacing={0}>
        {ids.map(this.renderFlightBooking)}
      </GridContainer>
    );

  renderBlankSlate = () => {
    const { classes } = this.props;

    return (
      <div className={classes.noContent}>
        <M {...m.blankSlate} />
      </div>
    );
  };

  render = () => {
    const { flightBookingIds, className, card } = this.props;

    const rendered = (
      <GridItem>
        <div className={className}>
          <GridContainer direction="column">
            <GridItem>{this.renderTitle()}</GridItem>
            <GridItem>
              {this.renderFlightBookings(flightBookingIds) ||
                this.renderBlankSlate()}
            </GridItem>
          </GridContainer>
        </div>
      </GridItem>
    );

    if (!card) return rendered;

    return (
      <GridItem>
        <GridContainer card direction="column" spacing={0}>
          {rendered}
        </GridContainer>
      </GridItem>
    );
  };
}

FlightBookings.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent
  card: PropTypes.bool,
  bottom: PropTypes.bool,
  editing: PropTypes.bool,
  showAmounts: PropTypes.string,
  className: PropTypes.string,
  templateId: PropTypes.number,
  portalId: PropTypes.number,
  selectedId: PropTypes.number,

  // resaga value
  flightBookingIds: PropTypes.array,
  flightIds: PropTypes.array,
};

FlightBookings.defaultProps = {
  bottom: false,

  flightBookingIds: [],
  flightIds: [],
};

export default compose(
  withStyles(styles, { name: 'FlightBookings' }),
  resaga(CONFIG_1()),
  resaga(CONFIG_2()),
)(FlightBookings);
