import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import Icon from 'ugcomponents/Icon';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { VARIANTS } from 'variantsConstants';

import styles from './styles';

export class Header extends PureComponent {
  renderIcon = () => {
    const { classes, renderIcon, iconColor } = this.props;

    const rendered = LOGIC_HELPERS.ifFunction(
      renderIcon,
      [],
      <Icon color={iconColor} icon={renderIcon} />,
    );

    return <GridItem className={classes.iconGrid}>{rendered}</GridItem>;
  };

  renderTitle = () => {
    const { classes, renderTitle } = this.props;

    const rendered = LOGIC_HELPERS.ifFunction(renderTitle, [], renderTitle);

    return (
      <GridItem className={classnames(classes.title, classes.grow)}>
        {rendered}
      </GridItem>
    );
  };

  renderToggle = () => {
    const { expanded, onClickToggle, isLoading } = this.props;
    return (
      <GridItem>
        <Button
          onClick={onClickToggle}
          color="gray"
          size="small"
          icon={LOGIC_HELPERS.ifElse(
            expanded,
            'lnr-chevron-up',
            'lnr-chevron-down',
          )}
          iconButton
          variant={VARIANTS.BORDERLESS}
          tabIndex={-1}
          noMargin
          noPadding
          disabled={isLoading}
        />
      </GridItem>
    );
  };

  render = () => {
    const { classes } = this.props;

    return (
      <GridItem className={classes.header}>
        <div className={classes.padding}>
          <GridContainer direction="row" alignItems="center">
            {this.renderIcon()}
            {this.renderTitle()}
            {this.renderToggle()}
          </GridContainer>
        </div>
      </GridItem>
    );
  };
}

Header.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  renderTitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  iconColor: PropTypes.string,
  expanded: PropTypes.bool,
  onClickToggle: PropTypes.func,
  isLoading: PropTypes.bool,

  // resaga props
};

Header.defaultProps = {
  expanded: false,
  isLoading: false,
};

export default compose(withStyles(styles, { name: 'Header' }))(Header);
