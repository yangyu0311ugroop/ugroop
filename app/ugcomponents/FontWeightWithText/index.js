import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './styles';

export class FontWeightWithText extends PureComponent {
  render() {
    const { content, fontWeight } = this.props;
    if (fontWeight === 0) {
      return <span>{content}</span>;
    }
    return <span style={{ fontWeight }}>{content}</span>;
  }
}

FontWeightWithText.propTypes = {
  content: PropTypes.string,
  fontWeight: PropTypes.number,
};

FontWeightWithText.defaultProps = {
  content: '',
};

export default withStyles(styles, { name: 'FontWeightWithText' })(
  FontWeightWithText,
);
