import { DEFAULT } from 'appConstants';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { SelectButton } from 'viewComponents/Inputs';

export class InterestedListModeSelect extends React.PureComponent {
  renderValue = value =>
    LOGIC_HELPERS.switchCase(value, {
      createdAt: 'Show All',
      invite: 'Show Pending',
      connected: 'Show Connected',
      [DEFAULT]: 'Show All',
    });

  renderOptions = () => {
    if (!this.options) {
      this.options = ['createdAt', 'invite', 'connected'].map(value => ({
        value,
        children: this.renderValue(value),
      }));
    }
    return this.options;
  };

  render = () => (
    <SelectButton
      options={this.renderOptions()}
      renderValue={this.renderValue}
      {...this.props}
    />
  );
}

InterestedListModeSelect.propTypes = {};

InterestedListModeSelect.defaultProps = {};

export default InterestedListModeSelect;
