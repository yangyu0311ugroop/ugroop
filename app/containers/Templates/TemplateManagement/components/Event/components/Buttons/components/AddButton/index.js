/**
 * Created by stephenkarpinskyj on 3/4/18.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';

import style from '../style';

// eslint-disable-next-line react/prefer-stateless-function
export class UGEventAddButton extends PureComponent {
  getOtherProps = () => ({
    className: LOGIC_HELPERS.ifElse(
      this.props.location === 'CARD_VIEW',
      '',
      classnames(
        this.props.classes.button,
        this.props.classes.Add,
        this.props.classes.addBtn,
        this.props.className,
      ),
    ),
    dense: LOGIC_HELPERS.ifElse(
      this.props.location === 'CARD_VIEW',
      true,
      false,
    ),
  });

  handleButtonClick = e => {
    e.preventDefault();
    this.props.onClick();
  };

  render = () => (
    <Button
      square
      size="small"
      title="Add Event"
      variant={VARIANTS.BORDERLESS}
      dense
      color="primary"
      icon="plus"
      iconButton
      disableRipple
      onClick={this.handleButtonClick}
      {...this.getOtherProps()}
    />
  );
}

UGEventAddButton.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,

  // parent
  onClick: PropTypes.func.isRequired,
  location: PropTypes.string,
  className: PropTypes.string,
};

UGEventAddButton.defaultProps = {
  location: '',
};

export default compose(withStyles(style, { name: 'UGEventTooltipIconButton' }))(
  UGEventAddButton,
);
