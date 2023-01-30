import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import Time from 'smartComponents/Event/components/Time';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import m from './messages';

export class EndTime extends PureComponent {
  renderLabel = () => (
    <Time
      renderPrefix={this.renderLabelPrefix}
      readOnlyEditablePlaceholder="No time set"
      {...this.props}
    />
  );

  renderLabelPrefix = () =>
    this.props.hasLabelPrefix && <M {...m.dropoffLabel} />;

  renderDefault = () => (
    <Time
      renderPrefix={this.renderLabelPrefix}
      editablePlaceholder="Click here to specify arrival time"
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
        renderLabel={this.renderLabel}
      />
    );
  };
}

EndTime.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  hasLabelPrefix: PropTypes.bool,

  // resaga props
};

EndTime.defaultProps = {
  variant: '',
  hasLabelPrefix: true,
};

export default EndTime;
