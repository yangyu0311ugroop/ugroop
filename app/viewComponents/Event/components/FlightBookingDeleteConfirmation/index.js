/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { DeleteConfirmationDialog } from 'ugcomponents/DialogPopup';
import m from './messages';

export class FlightBookingDeleteConfirmation extends React.PureComponent {
  renderTitle = () => <M {...m.title} />;

  renderHeadline = () => {
    const { name } = this.props;
    if (name) {
      return (
        <GridContainer spacing={0} direction="column" alignItems="center">
          <GridItem>
            <M {...m.headlineWithBookingNumber} />
          </GridItem>
          <GridItem>{name}</GridItem>
        </GridContainer>
      );
    }
    return <M {...m.headlineWithoutBookingNumber} />;
  };

  renderText = () => <M {...m.text} />;

  render = () => {
    const { name, ...rest } = this.props;
    return (
      <DeleteConfirmationDialog
        dialogTitle={this.renderTitle()}
        headlineTitle={this.renderHeadline()}
        headlineText={this.renderText()}
        {...rest}
      />
    );
  };
}

FlightBookingDeleteConfirmation.propTypes = {
  // parent
  name: PropTypes.string,
};

FlightBookingDeleteConfirmation.defaultProps = {
  name: null,
};

export default FlightBookingDeleteConfirmation;
