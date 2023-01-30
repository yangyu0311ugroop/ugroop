import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { DateTimeFromNow } from 'viewComponents/DateTime';
import { CONFIG } from './config';

export class ConsentedAt extends React.PureComponent {
  renderTextOnly = () => {
    const { value } = this.props;
    return <DateTimeFromNow dateTime={value} />;
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

ConsentedAt.propTypes = {
  // parent
  variant: PropTypes.string,

  // resaga value
  value: PropTypes.string,
};

ConsentedAt.defaultProps = {
  variant: null,

  value: null,
};

export default resaga(CONFIG)(ConsentedAt);
