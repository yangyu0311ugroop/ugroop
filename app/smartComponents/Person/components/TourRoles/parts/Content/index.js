import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CONFIG } from './config';
import styles from './styles';

export class Content extends PureComponent {
  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => <span>{this.props.content}</span>;

  render = () => {
    const { variant } = this.props;

    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Content.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,

  // resaga props
  content: PropTypes.string,
};

Content.defaultProps = {
  variant: '',
  content: '',
};

export default compose(
  withStyles(styles, { name: 'Content' }),
  resaga(CONFIG),
)(Content);
