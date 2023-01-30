/**
 * Created by stephenkarpinskyj on 11/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import Time from 'smartComponents/Event/components/Time';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import m from './messages';

export class StartTime extends React.PureComponent {
  renderDefault = () => (
    <Time
      editablePlaceholder={<M {...m.editablePlaceholder} />}
      {...this.props}
    />
  );

  renderLabelPrefix = () => {
    const { hasLabelPrefix, customLabel } = this.props;
    return (
      hasLabelPrefix &&
      LOGIC_HELPERS.ifElse(customLabel, customLabel, <M {...m.labelPrefix} />)
    );
  };

  renderLabel = () => (
    <Time renderPrefix={this.renderLabelPrefix} {...this.props} />
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

StartTime.propTypes = {
  // parent
  variant: PropTypes.string,
  hasLabelPrefix: PropTypes.bool,
  customLabel: PropTypes.string,
};

StartTime.defaultProps = {
  variant: null,
  hasLabelPrefix: true,
};

export default StartTime;
