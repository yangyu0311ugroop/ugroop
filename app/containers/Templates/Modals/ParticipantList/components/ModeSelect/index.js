import { DEFAULT } from 'appConstants';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { SelectButton } from 'viewComponents/Inputs';

export class ParticipantListModeSelect extends React.PureComponent {
  getStrippedOwnProps = () => omit(this.props, ['includeInviteMode']);

  renderValue = value =>
    LOGIC_HELPERS.switchCase(value, {
      personType: 'Show People',
      [DEFAULT]: 'Show Invitations',
    });

  renderOptions = () => {
    const { includeInviteMode } = this.props;

    const options = ['personType'];

    if (includeInviteMode) {
      options.push('invite');
    }

    return options.map(value => ({
      value,
      children: this.renderValue(value),
    }));
  };

  render = () => (
    <SelectButton
      options={this.renderOptions()}
      renderValue={this.renderValue}
      {...this.getStrippedOwnProps()}
    />
  );
}

ParticipantListModeSelect.propTypes = {
  includeInviteMode: PropTypes.bool,
};

ParticipantListModeSelect.defaultProps = {
  includeInviteMode: true,
};

export default ParticipantListModeSelect;
