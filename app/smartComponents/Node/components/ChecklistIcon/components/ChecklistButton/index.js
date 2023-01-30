import { OUTSTANDING_SHORT } from 'appConstants';
import classNames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import { withStyles } from 'components/material-ui';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import BadgeProgress from 'smartComponents/Node/parts/BadgeProgress';
import IconButton from 'ugcomponents/Buttons/IconButton';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Icon from 'viewComponents/Icon';
import { CONFIG } from './config';
import styles from './styles';

export class ChecklistButton extends PureComponent {
  render = () => {
    const {
      classes,
      id,
      checklists,
      iconClass,
      small,
      showChecklists,
      onClick,
      xsIcon,
    } = this.props;

    return (
      <GridContainer
        alignItems="center"
        onClick={LOGIC_HELPERS.ifElse(
          typeof onClick === 'function',
          onClick,
          this.toggleChecklists,
        )}
        spacing={0}
        className={classNames(iconClass)}
      >
        <GridItem className={classes.relative}>
          <IconButton
            title="Show Checklists"
            className={classNames(
              classes.defaultButton,
              LOGIC_HELPERS.ifElse(showChecklists, classes.noTransform),
              LOGIC_HELPERS.ifElse(small, classes.smallButton),
            )}
            disableTriggerFocus
            disableRipple
          >
            <div className={xsIcon && classes.xsCount}>
              <BadgeProgress
                id={id || checklists}
                variant={OUTSTANDING_SHORT}
              />
            </div>
          </IconButton>

          <Icon
            size={LOGIC_HELPERS.ifElse(small, 'small', 'medium')}
            className={classNames(
              classes.icon,
              LOGIC_HELPERS.ifElse(showChecklists, classes.iconShow),
              LOGIC_HELPERS.ifElse(small, classes.smallIcon),
              LOGIC_HELPERS.ifElse(xsIcon, classes.xsIcon),
            )}
            icon="ug-pin-3"
          />
        </GridItem>
      </GridContainer>
    );
  };
}

ChecklistButton.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent
  id: PropTypes.number,
  iconClass: PropTypes.string,
  onClick: PropTypes.func,

  // resaga
  checklists: PropTypes.array,
  showChecklists: PropTypes.bool,

  // custom
  small: PropTypes.bool,
  xsIcon: PropTypes.bool,
};

ChecklistButton.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'ChecklistButton' }),
  resaga(CONFIG),
)(ChecklistButton);
