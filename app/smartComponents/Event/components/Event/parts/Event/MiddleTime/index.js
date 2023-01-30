/**
 * Created by stephenkarpinskyj on 12/10/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as M } from 'react-intl';
import { ForEachEventVariant } from 'smartComponents/Event/logics';
import { EventIconSublabel } from 'viewComponents/Event';
import m from './messages';

export class MiddleTime extends React.PureComponent {
  renderLabelValue = () => (
    <EventIconSublabel>
      <M {...m.labelValue} />
    </EventIconSublabel>
  );

  render = () => {
    const { variant } = this.props;
    return (
      <ForEachEventVariant
        variant={variant}
        renderDefault={this.renderLabelValue}
      />
    );
  };
}

MiddleTime.propTypes = {
  // parent
  variant: PropTypes.string,
};

MiddleTime.defaultProps = {
  variant: null,
};

export default MiddleTime;
