/**
 * Created by john april serafico on 05/27/20.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { EVENT_HELPERS } from 'utils/helpers/events';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import { DuplicateConfirmationDialog } from 'ugcomponents/DialogPopup';

import m from './messages';

export class EventDuplicateConfirmation extends React.PureComponent {
  renderTitle = () => <M {...m.title} />;

  renderHeadline = () => {
    const { name } = this.props;
    if (name) {
      return (
        <GridContainer spacing={0} direction="column" alignItems="center">
          <GridItem>
            <M {...m.headlineWithEventName} />
          </GridItem>
          <GridItem>{name}</GridItem>
        </GridContainer>
      );
    }
    return <M {...m.headlineWithoutEventName} />;
  };

  renderText = () => {
    const { type, subtype } = this.props;
    const { name: typeName } = EVENT_HELPERS.getEventSubtypeConstants(
      type,
      subtype,
    );
    return <M {...m.text} values={{ typeName }} />;
  };

  render = () => {
    const { type, subtype, name, ...rest } = this.props;
    return (
      <DuplicateConfirmationDialog
        dialogTitle={this.renderTitle()}
        headlineTitle={this.renderHeadline()}
        headlineText={this.renderText()}
        {...rest}
      />
    );
  };
}

EventDuplicateConfirmation.propTypes = {
  // parent
  type: PropTypes.string,
  subtype: PropTypes.string,
  name: PropTypes.string,
};

EventDuplicateConfirmation.defaultProps = {
  type: null,
  subtype: null,
  name: null,
};

export default EventDuplicateConfirmation;
