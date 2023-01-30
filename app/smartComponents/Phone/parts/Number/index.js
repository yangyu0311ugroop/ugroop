import { DEFAULT } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import JText from 'components/JText';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { Phone } from 'smartComponents/Inputs';
import P from 'viewComponents/Typography';
import omit from 'lodash/omit';
import { CONFIG } from './config';
import styles from './styles';

export class Number extends PureComponent {
  stripOwnProps = () => omit(this.props, ['classes', 'variant', 'number']);

  handleClickNumber = () => {
    const { number } = this.props;

    window.open(`tel:${number}`);
  };

  renderDefault = () => this.renderTextOnly();

  renderTextOnly = () => {
    const { number, fontWeight } = this.props;
    return (
      <P
        noMargin
        weight={fontWeight}
        clickable
        onClick={this.handleClickNumber}
      >
        {number}
      </P>
    );
  };

  renderInlineText = () => {
    const { component: Component } = this.props;

    return (
      <Component>
        <JText
          dark
          bold={this.props.isDefault}
          ellipsis
          title={this.props.number}
        >
          {this.props.number}
        </JText>
      </Component>
    );
  };

  renderEditable = () => {
    const { number } = this.props;

    return (
      <Phone required name="number" value={number} {...this.stripOwnProps()} />
    );
  };

  renderProp = () => {
    const { children, number, isDefault } = this.props;

    return children({ value: number, isDefault });
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.TEXT_FIELD]: this.renderEditable,
      [VARIANTS.INLINE_TEXT]: this.renderInlineText,
      [VARIANTS.RENDER_PROP]: this.renderProp,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Number.propTypes = {
  // hoc props

  // parent props
  variant: PropTypes.string,
  children: PropTypes.node,
  fontWeight: PropTypes.string,
  component: PropTypes.any,
  isDefault: PropTypes.bool,

  // resaga props
  number: PropTypes.string,
};

Number.defaultProps = {
  number: '',
  variant: '',
  fontWeight: 'bold',
  component: 'span',
};

export default compose(
  withStyles(styles, { name: 'Number' }),
  resaga(CONFIG),
)(Number);
