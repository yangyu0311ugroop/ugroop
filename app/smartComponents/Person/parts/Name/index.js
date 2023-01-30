import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { STRING_ADDITIONS } from 'utils/stringAdditions';
import { CONFIG } from './config';

export class Name extends React.PureComponent {
  renderTextOnly = () => STRING_ADDITIONS.renderName(this.props, 'Unnamed');

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [DEFAULT]: this.renderTextOnly,
    });
  };
}

Name.propTypes = {
  // parent
  variant: PropTypes.string,
};

Name.defaultProps = {
  variant: '',
};

export default resaga(CONFIG)(Name);
