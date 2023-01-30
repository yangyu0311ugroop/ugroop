import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import resaga from 'resaga';
import PropTypes from 'prop-types';
import Icon from 'ugcomponents/Icon';
import Button from 'viewComponents/Button';
import { compose } from 'redux';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { VARIANTS } from 'variantsConstants';
import { DEFAULT, DO_NOTHING_FUNC } from 'appConstants';
import { iconAction } from '../../helpers/index';
import { CONFIG } from './config';
import styles from './styles';

export class ActionIcon extends PureComponent {
  renderDefault = () => {
    const { action } = this.props;
    const iconName = iconAction(action);
    return (
      <span>
        <Icon color="success" icon={iconName} />
      </span>
    );
  };

  renderButton = () => {
    const { action, onClick, loading } = this.props;
    const iconName = iconAction(action);

    return (
      <Button
        title="Hide"
        icon={iconName}
        iconButton
        noPadding
        noMargin
        color="primary"
        variant="borderless"
        onClick={onClick}
        loading={loading}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [VARIANTS.BUTTON]: this.renderButton,
      [DEFAULT]: this.renderDefault,
    });
  };
}

ActionIcon.propTypes = {
  // resaga props
  action: PropTypes.string,

  // parent props
  variant: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

ActionIcon.defaultProps = {
  action: '',
  loading: false,
  variant: DEFAULT,
  onClick: DO_NOTHING_FUNC,
};

export default compose(
  withStyles(styles, { name: 'ActionIcon' }),
  resaga(CONFIG),
)(ActionIcon);
