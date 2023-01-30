import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import FText from 'components/Inputs/TextField/components/FilledInputs/components/FText';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import { withStyles } from 'components/material-ui';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import Icon from 'ugcomponents/Icon';
import { Data } from 'ugcomponents/Inputs';
import SimpleRTE from 'ugcomponents/Inputs/SimpleRTE';
import { isEmptyRTE } from 'utils/helpers/RTE';
import JButton from 'viewComponents/Button/variants/JButton';
import { CONFIG } from './config';
import styles from './styles';

export const defaultValue = props => {
  const { data } = props;

  return (
    EVENT_VIEW_HELPERS.supplierPhoneNumber(data) ||
    EVENT_VIEW_HELPERS.url(data) ||
    !isEmptyRTE(EVENT_VIEW_HELPERS.description(data))
  );
};

export class NumberURLDescription extends PureComponent {
  state = {
    adding: !!defaultValue(this.props),
  };

  setAdding = () => this.setState({ adding: true });

  render = () => {
    const { data } = this.props;
    const { adding } = this.state;

    if (!adding) {
      return (
        <>
          <JButton onClick={this.setAdding}>
            <GridContainer alignItems="center" wrap="nowrap">
              <GridItem>
                <Icon icon="lnr-plus" size="xsmall" color="blue" bold />
              </GridItem>
              <GridItem>
                <GridContainer direction="column" spacing={0}>
                  <GridItem>
                    <JText blue>Phone, Website or Description</JText>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </JButton>
          <Data
            currentValue=""
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.transportationDetailSupplierName,
            )}
          />
        </>
      );
    }

    return (
      <GridContainer direction="column">
        <GridItem>
          <GridContainer alignItems="center">
            <GridItem xs={12} sm={6}>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(
                  EVENT_PATHS.transportationDetailSupplierPhone,
                )}
                label="Supplier phone"
                placeholder="Enter supplier phone"
                value={EVENT_VIEW_HELPERS.supplierPhoneNumber(data)}
              />
            </GridItem>

            <GridItem xs={12} sm={6}>
              <FText
                name={EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.url)}
                label="Website"
                placeholder="Enter website"
                value={EVENT_VIEW_HELPERS.url(data)}
              />
            </GridItem>
          </GridContainer>
        </GridItem>

        <GridItem>
          <SimpleRTE
            name={EVENT_STORE_HELPERS.pathToEventInputName(
              EVENT_PATHS.description,
            )}
            placeholder="Tell some more about this.."
            filled
            value={EVENT_VIEW_HELPERS.description(data)}
          />
        </GridItem>
      </GridContainer>
    );
  };
}

NumberURLDescription.propTypes = {
  // hoc props
  // classes: PropTypes.object.isRequired,
  // parent props
  data: PropTypes.object,

  // resaga props
};

NumberURLDescription.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'NumberURLDescription' }),
  resaga(CONFIG),
)(NumberURLDescription);
