/**
 * Created by stephenkarpinskyj on 11/9/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { ONE_DAY_DURATION } from 'utils/constants/dateTime';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import Time from 'smartComponents/Event/components/Time';
import timeUtils from 'smartComponents/Event/components/Time/utils';
import m from './messages';

export class EndTime extends React.PureComponent {
  renderDefault = () => (
    <Time
      editablePlaceholder={<M {...m.editablePlaceholder} />}
      renderDuration={timeUtils.renderNightCount}
      defaultValue={ONE_DAY_DURATION}
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

EndTime.propTypes = {
  // parent
  variant: PropTypes.string,
};

EndTime.defaultProps = {
  variant: null,
};

export default EndTime;
