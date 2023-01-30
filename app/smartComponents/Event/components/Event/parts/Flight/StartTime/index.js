/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import Time from 'smartComponents/Event/components/Time';
import m from './messages';

export class StartTime extends React.PureComponent {
  renderDefault = () => (
    <Time
      editablePlaceholder={<M {...m.editablePlaceholder} />}
      {...this.props}
    />
  );

  renderLabelPrefix = () => <M {...m.labelPrefix} />;

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
};

StartTime.defaultProps = {
  variant: null,
};

export default StartTime;
