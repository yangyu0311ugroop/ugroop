import Empty from 'components/Empty';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { withSMDown } from 'components/material-ui/hocs/withMediaQuery';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import moment from 'moment';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class ReservationCard extends PureComponent {
  hasReservation = () => {
    const { event } = this.props;

    const personCount = EVENT_VIEW_HELPERS.personCount(event);
    const bookingNumber = EVENT_VIEW_HELPERS.bookingNumber(event);
    const bookedBy = EVENT_VIEW_HELPERS.bookedBy(event);
    const supplierName = EVENT_VIEW_HELPERS.supplierName(event);
    const bookingDate = EVENT_VIEW_HELPERS.bookingDate(event);
    const paidBy = EVENT_VIEW_HELPERS.paidBy(event);

    return Boolean(
      personCount ||
        bookingNumber ||
        bookedBy ||
        supplierName ||
        bookingDate ||
        paidBy,
    );
  };

  renderPersonCount = () => {
    const { event, smDown } = this.props;

    const value = EVENT_VIEW_HELPERS.personCount(event);

    if (!value) return null;

    return (
      <GridItem xs={LOGIC_HELPERS.ifElse(smDown, 12)}>
        <GridContainer spacing={0} alignItems="center" direction="column">
          <GridItem>
            <JText black xxl>
              {value}
            </JText>
          </GridItem>
          <GridItem>
            <JText sm uppercase gray>
              People
            </JText>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderValue = value => (
    <GridItem>
      <JText black={!!value} gray={!value} italic={!value} ellipsis>
        {value || 'n/a'}
      </JText>
    </GridItem>
  );

  renderBookingNumber = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.bookingNumber(event);

    return this.renderValue(value);
  };

  renderBookedBy = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.bookedBy(event);

    return this.renderValue(value);
  };

  renderSupplierName = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.supplierName(event);

    return this.renderValue(value);
  };

  renderBookingDate = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.bookingDate(event);

    if (value) {
      return this.renderValue(
        moment(value, 'YYYY-MM-DD HH:mm:ss.SSS').format('DD/MM/YYYY'),
      );
    }

    return this.renderValue(value);
  };

  renderPaidBy = () => {
    const { event } = this.props;

    const value = EVENT_VIEW_HELPERS.paidBy(event);

    return this.renderValue(value);
  };

  renderEmpty = () => {
    const { classes, preview } = this.props;

    if (!preview) return null;

    return (
      <GridItem>
        <Empty title="Reservation" cardClassName={classes.preview} />
      </GridItem>
    );
  };

  render = () => {
    const { classes, preview } = this.props;

    if (!this.hasReservation()) {
      return this.renderEmpty();
    }

    return (
      <GridItem>
        <GridContainer
          card
          direction="column"
          spacing={0}
          cardClassName={LOGIC_HELPERS.ifElse(preview, classes.preview)}
        >
          {LOGIC_HELPERS.ifElse(
            preview,
            <GridItem>
              <JText danger sm uppercase>
                preview
              </JText>
            </GridItem>,
          )}
          <GridItem>
            <GridContainer direction="column" spacing={2}>
              <GridItem>
                <JText bold black>
                  Booking
                </JText>
              </GridItem>
              <GridItem>
                <GridContainer alignItems="center" spacing={2}>
                  <GridItem>
                    <GridContainer direction="column">
                      <GridItem>
                        <JText gray>Booking number</JText>
                      </GridItem>
                      <GridItem>
                        <JText gray>Booked by</JText>
                      </GridItem>
                      <GridItem>
                        <JText gray>Supplier name</JText>
                      </GridItem>
                      <GridItem>
                        <JText gray>Booking date</JText>
                      </GridItem>
                      <GridItem>
                        <JText gray>Paid by</JText>
                      </GridItem>
                    </GridContainer>
                  </GridItem>

                  <GridItem xs>
                    <GridContainer direction="column">
                      {this.renderBookingNumber()}
                      {this.renderBookedBy()}
                      {this.renderSupplierName()}
                      {this.renderBookingDate()}
                      {this.renderPaidBy()}
                    </GridContainer>
                  </GridItem>

                  {this.renderPersonCount()}
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };
}

ReservationCard.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  smDown: PropTypes.bool,

  // parent props
  event: PropTypes.object,
  preview: PropTypes.bool,

  // resaga props
};

ReservationCard.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'ReservationCard' }),
  resaga(CONFIG),
  withSMDown,
)(ReservationCard);
