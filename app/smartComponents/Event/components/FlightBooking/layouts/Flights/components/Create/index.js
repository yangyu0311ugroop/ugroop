import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { EVENT_CONSTANTS } from 'utils/constants/events';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import Hr from 'components/Hr';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Popper, { PopperMenuItem } from 'components/Popper';
import CreateButton from 'viewComponents/CreateButton';
import { FlightIds } from 'smartComponents/Node/logics';
import { withCanEditFlightBooking } from 'smartComponents/Event/hoc';
import Flight from './components/Flight';
import style from './style';
import { CONFIG } from './config';
import m from './messages';

export class FlightCreate extends React.PureComponent {
  canCreateEvent = () => {
    const { templatePageId } = this.props;
    return EVENT_HELPERS.canCreateEvent() && !!templatePageId;
  };

  handleCreateFlightOpen = () => {
    const { dataId } = this.props;
    this.props.resaga.setValue({
      formType: EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type,
      formSubtype: EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type,
      formFlightBooking: dataId,
    });

    return {
      typeOpen: false,
      subtypeOpen: false,
    };
  };

  handleCreateFlightClick = () => {
    this.props.resaga.setValue({
      eventCreate: EVENT_STORE_HELPERS.setEventCreate(
        true,
        null,
        this.handleCreateFlightOpen,
      ),
    });
  };

  renderPart = (Component, variant) => <Component variant={variant} />;

  renderFlightButton = id => {
    const { dataId, templateId } = this.props;
    return (
      <Flight key={id} id={id} newBookingId={dataId} templateId={templateId} />
    );
  };

  renderCreateButton = ({ closeMenu }) => (
    <PopperMenuItem
      icon="lnr-plus"
      closeMenu={closeMenu}
      onClick={this.handleCreateFlightClick}
    >
      <M {...m.createMenuItemLabel} />
    </PopperMenuItem>
  );

  renderMenu = flightIds => obj => (
    <GridContainer direction="column">
      {flightIds.map(this.renderFlightButton)}
      {this.canCreateEvent() && (
        <React.Fragment>
          <Hr noMarginTop noMarginBottom />
          <GridItem>{this.renderCreateButton(obj)}</GridItem>
        </React.Fragment>
      )}
    </GridContainer>
  );

  renderButton = ({ openMenu }) => {
    const { classes } = this.props;
    return (
      <CreateButton
        className={classes.createButton}
        variant={VARIANTS.BORDERLESS}
        title={<M {...m.buttonTitle} />}
        icon="lnr-cog2"
        onClick={openMenu}
      />
    );
  };

  renderContent = flightIds => {
    const { classes } = this.props;
    return flightIds.length ? (
      <Popper
        className={classes.popperRoot}
        renderButton={this.renderButton}
        placement="bottom-end"
        halfPadding
      >
        {this.renderMenu(flightIds)}
      </Popper>
    ) : (
      this.canCreateEvent() &&
        this.renderButton({ openMenu: this.handleCreateFlightClick })
    );
  };

  render = () => {
    const { dataId, canEditFlightBooking } = this.props;
    return (
      !!canEditFlightBooking && (
        <FlightIds flightBookingDataId={dataId} allFlights>
          {this.renderContent}
        </FlightIds>
      )
    );
  };
}

FlightCreate.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  canEditFlightBooking: PropTypes.bool,

  // parent
  dataId: PropTypes.number,
  templatePageId: PropTypes.number,
  templateId: PropTypes.number,
};

FlightCreate.defaultProps = {
  dataId: null,
  templatePageId: null,
  templateId: null,
};

export default compose(
  withStyles(style, {
    name: 'smartComponents/Event/FlightBooking/Flights/Create',
  }),
  withCanEditFlightBooking,
  resaga(CONFIG),
)(FlightCreate);
