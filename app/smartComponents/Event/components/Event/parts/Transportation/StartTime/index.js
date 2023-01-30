import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';

import { ForEachEventVariant } from 'smartComponents/Event/logics';
import Time from 'smartComponents/Event/components/Time';

import m from './messages';

export class StartTime extends PureComponent {
  renderLabel = () => (
    <Time
      renderPrefix={this.renderLabelPrefix}
      readOnlyEditablePlaceholder="No time set"
      {...this.props}
    />
  );

  renderLabelPrefix = () =>
    this.props.hasLabelPrefix && <M {...m.pickupLabel} />;

  renderDefault = () => (
    <Time
      renderPrefix={this.renderLabelPrefix}
      editablePlaceholder="Click here to specify departure time"
      readOnlyEditablePlaceholder="No time set"
      {...this.props}
    />
  );

  render = () => {
    const { variant } = this.props;

    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderDefault}
        renderField={this.renderLabel}
      />
    );
  };
}

StartTime.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  hasLabelPrefix: PropTypes.bool,

  // resaga props
};

StartTime.defaultProps = {
  variant: '',
  hasLabelPrefix: true,
};

export default StartTime;
