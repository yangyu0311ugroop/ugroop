import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Hr from 'components/Hr';
import { FilledTextField } from 'components/Inputs/TextField/components/FilledInputs';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import { withStyles } from 'components/material-ui';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { DatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import moment from 'moment';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { Data } from 'ugcomponents/Inputs';
import ValidationRadioGroup from 'ugcomponents/Inputs/ValidationRadioGroup';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { adding, editing } = props;

  if (adding || editing) return 'yes';

  return undefined;
};

export const defaultBookingDate = props => {
  const { data } = props;

  const bookingDate = EVENT_VIEW_HELPERS.bookingDate(data);

  if (!bookingDate) return null;

  return moment(bookingDate, 'YYYY-MM-DD HH:mm:ss.SSS');
};

export class Reservation extends PureComponent {
  state = {
    open: defaultValue(this.props),
    bookingDate: defaultBookingDate(this.props),
  };

  changeAdding = open => {
    this.setState({ open });
  };

  handlePickDate = bookingDate => {
    this.setState({ bookingDate });
  };

  render = () => {
    const { data, editing } = this.props;
    const { open, bookingDate } = this.state;

    const type = EVENT_VIEW_HELPERS.type(data);

    return (
      <GridContainer direction="column">
        <Data
          currentValue={
            bookingDate && bookingDate.format('YYYY-MM-DD HH:mm:ss.SSS')
          }
          name={EVENT_STORE_HELPERS.pathToEventInputName(
            LOGIC_HELPERS.ifElse(
              type === 'Transportation',
              EVENT_PATHS.transportationDetailBookingDate,
              EVENT_PATHS.bookingDate,
            ),
          )}
        />

        <Hr half />

        {LOGIC_HELPERS.ifElse(
          !editing,
          <GridItem>
            <GridContainer direction="column" spacing={0}>
              <GridItem>
                <ValidationRadioGroup
                  name="temp.booked"
                  row
                  noMargin
                  required
                  options={{ yes: 'Yes', no: 'No' }}
                  onChange={this.changeAdding}
                  label={
                    <JText bold dark>
                      Have you booked?{' '}
                      <JText sm danger>
                        Required
                      </JText>
                    </JText>
                  }
                />
              </GridItem>
            </GridContainer>
          </GridItem>,
        )}

        {open === 'yes' && (
          <>
            <GridItem>
              <JText gray italic nowrap={false}>
                Your edits in uGroop won{`'`}t change the actual booking.
              </JText>
            </GridItem>
            <GridItem>
              <GridContainer alignItems="center">
                <GridItem xs={12} sm={7}>
                  <FText
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      LOGIC_HELPERS.ifElse(
                        type === 'Transportation',
                        EVENT_PATHS.transportationDetailSupplierName,
                        EVENT_PATHS.supplierName,
                      ),
                    )}
                    label="Supplier name"
                    placeholder="Enter supplier name"
                    value={EVENT_VIEW_HELPERS.supplierName(data)}
                  />
                </GridItem>
                <GridItem xs={12} sm={5}>
                  <FText
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      LOGIC_HELPERS.ifElse(
                        type === 'Transportation',
                        EVENT_PATHS.transportationDetailBookerName,
                        EVENT_PATHS.bookedBy,
                      ),
                    )}
                    label="Booked by"
                    placeholder="Enter booked by"
                    value={EVENT_VIEW_HELPERS.bookedBy(data)}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <GridContainer alignItems="center">
                <GridItem xs={12} sm={7}>
                  <FText
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      LOGIC_HELPERS.ifElse(
                        type === 'Transportation',
                        EVENT_PATHS.transportationDetailBookingNumber,
                        EVENT_PATHS.bookingNumber,
                      ),
                    )}
                    label="Booking confirmation"
                    placeholder="Enter booking confirmation"
                    value={EVENT_VIEW_HELPERS.bookingNumber(data)}
                  />
                </GridItem>
                <GridItem xs={12} sm={5}>
                  <FText
                    type="number"
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      LOGIC_HELPERS.ifElse(
                        type === 'Transportation',
                        EVENT_PATHS.transportationDetailBookingPersonCount,
                        EVENT_PATHS.bookingPersonCount,
                      ),
                    )}
                    label="Guests"
                    placeholder="Enter number of guests"
                    value={EVENT_VIEW_HELPERS.personCount(data)}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <GridContainer alignItems="center">
                <GridItem xs={12} sm={7}>
                  <DatePicker
                    label="Booking date"
                    placeholder="Enter booking date"
                    onChange={this.handlePickDate}
                    value={bookingDate}
                    defaultValue={null}
                    TextFieldComponent={FilledTextField}
                    leftArrowIcon={<Icon icon="arrow-left" />}
                    rightArrowIcon={<Icon icon="arrow-right" />}
                    format="DD/MM/YYYY"
                    clearable
                    autoOk
                  />
                </GridItem>
                <GridItem xs={12} sm={5}>
                  <FText
                    name={EVENT_STORE_HELPERS.pathToEventInputName(
                      LOGIC_HELPERS.ifElse(
                        type === 'Transportation',
                        EVENT_PATHS.transportationDetailPaidBy,
                        EVENT_PATHS.paidBy,
                      ),
                    )}
                    label="Paid by"
                    placeholder="Enter paid by"
                    value={EVENT_VIEW_HELPERS.paidBy(data)}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </>
        )}
      </GridContainer>
    );
  };
}

Reservation.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // parent props
  data: PropTypes.object,
  editing: PropTypes.bool,

  // resaga props
};

Reservation.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'Reservation' }),
  resaga(CONFIG),
)(Reservation);
